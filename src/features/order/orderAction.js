import { createAsyncThunk } from '@reduxjs/toolkit';
import { funcs, db } from '../../config/firebase';

export const fetchOrder = createAsyncThunk(
	'order/fetchOrder',
	async (_, { rejectWithValue, getState }) => {
		try {
			const user = getState().user;

			const snapshot = await db
				.collection('orders')
				.orderBy('timestamp', 'desc')
				.where('user.uid', '==', user.data.uid)
				.get();

			return snapshot.docs.map((doc) => ({
				id: doc.id,
				payment_status: doc.data().payment_status,
				total_price: doc.data().total_price,
				created_at: doc.data().timestamp.toDate().toString(),
			}));
		} catch (err) {
			return rejectWithValue({ message: err.message, code: err.code });
		}
	}
);

export const fetchOrderById = createAsyncThunk(
	'order/fetchOrderById',
	async (id, { rejectWithValue }) => {
		try {
			const order = await db.collection('orders').doc(id).get();

			let payment_status = order.data().payment_status;

			if (order.data().payment_status === 'pending') {
				const checkPaymentStatus = funcs.httpsCallable('checkPaymentStatus');
				if (!checkPaymentStatus)
					return rejectWithValue({
						code: 'function-notfound',
						message: 'functions not actived',
					});

				const status = await checkPaymentStatus(order.id);

				payment_status = status.data || payment_status;
			}

			return {
				id: order.id,
				payment_status: payment_status,
				payment_details: order.data().payment_details,
				products: order.data().products,
				created_at: order.data().timestamp.toDate().toString(),
				total_price: order.data().total_price,
			};
		} catch (err) {
			return rejectWithValue({ message: err.message, code: err.code });
		}
	}
);

export const checkoutOrder = createAsyncThunk(
	'order/checkoutOrder',
	async (total, { rejectWithValue, getState }) => {
		try {
			const cart = getState().cart;

			if (cart.data.length < 1)
				return rejectWithValue({
					code: 'cart-empty',
					message: 'your cart is empty',
				});

			const checkOut = funcs.httpsCallable('checkOut');

			if (!checkOut)
				return rejectWithValue({
					code: 'function-notfound',
					message: 'functions not actived',
				});

			const id = await checkOut({
				products: cart.data,
				total_price: total,
			});

			return id;

			// await db.collection('orders').add();
		} catch (err) {
			return rejectWithValue({ message: err.message, code: err.code });
		}
	}
);
