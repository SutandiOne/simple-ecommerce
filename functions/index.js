const functions = require('firebase-functions');
const admin = require('firebase-admin');
const midtransClient = require('midtrans-client');

// 	functions.logger.info('Hello logs!', { structuredData: true });

admin.initializeApp();

const db = admin.firestore();

const snap = new midtransClient.Snap({
	isProduction: false,
	serverKey: functions.config().midtrans.server_key,
	clientKey: functions.config().midtrans.client_key,
});

//test sample
exports.checkPayment = functions.https.onRequest(async (req, res) => {
	const status = await snap.transaction.status('HtvldfRKxqWloIMfrdy');
	res.send(status);
});

const createTokenMidtrans = async (
	order_id,
	gross_amount,
	first_name,
	email
) => {
	try {
		let parameter = {
			transaction_details: {
				order_id,
				gross_amount,
			},
			credit_card: {
				secure: true,
			},
			customer_details: {
				first_name,
				email,
			},
			callbacks: {
				finish: `${functions.config().app.url}/orders/${order_id}`,
			},
		};

		let response = await snap.createTransaction(parameter);

		return response;
	} catch (err) {
		throw new functions.https.HttpsError(
			'bad-request',
			'request not found, request canceled.'
		);
	}
};

const validProduct = async (carts) => {
	try {
		//get cart data and formated
		const formatCartId = carts.map((p) => p.id);
		const getOnlyCartId = Array.from(formatCartId.values('id'));

		//find cart product in firestore product
		const refProduct = db.collection('products');
		const products = await refProduct
			.where(admin.firestore.FieldPath.documentId(), 'in', getOnlyCartId)
			.get();
		//finded cart product valid
		const validCart = products.docs.map((doc) => doc.id);

		const dataCart = [];

		validCart.forEach((id) => {
			let findValidCart = carts.find((product) => product.id === id);
			dataCart.push(findValidCart);
		});

		return dataCart;
	} catch (err) {
		throw new functions.https.HttpsError(
			'bad-request',
			'request not found, request canceled.'
		);
	}
};

exports.checkPaymentStatus = functions.https.onCall(async (id, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError(
			'unauthenticated',
			'user not found, request canceled.'
		);
	}

	try {
		const transaction = await snap.transaction.status(id);
		await db.collection('orders').doc(id).update({
			payment_status: transaction.transaction_status,
		});
		return transaction.transaction_status;
	} catch (error) {
		return '';
	}
});

exports.checkOut = functions.https.onCall(async (data, context) => {
	// functions.logger.info(data);

	//jika tidak login
	if (!context.auth) {
		throw new functions.https.HttpsError(
			'unauthenticated',
			'user not found, request canceled.'
		);
	}

	try {
		const user = await db.collection('users').doc(context.auth.uid).get();

		const carts = await validProduct(data.products);

		if (carts.length < 1)
			throw new functions.https.HttpsError(
				'order-error',
				'product not found, request canceled.'
			);

		//save to firestore
		const order = await db.collection('orders').add({
			user: {
				uid: user.id,
				displayName: user.data().displayName,
				email: user.data().email,
			},
			products: carts,
			total_price: data.total_price,
			payment_status: 'pending',
			timestamp: admin.firestore.FieldValue.serverTimestamp(),
		});

		//create token for payment
		const payment = await createTokenMidtrans(
			order.id,
			data.total_price,
			user.data().displayName,
			user.data().email
		);

		//update token to firestore
		await order.update({
			payment_details: payment,
		});
	} catch (err) {
		// throw new functions.https.HttpsError(err.code, err.message);
		return err;
	}
});
