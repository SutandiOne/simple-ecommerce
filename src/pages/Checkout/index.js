import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectCartPriceTotal, cleanCart } from 'features/cart/cartSlice';
import { selectOrderError, cleanOrderError } from 'features/order/orderSlice';
import { checkoutOrder } from 'features/order/orderAction';
import { useHistory } from 'react-router';
import Cart from 'components/Cart';
import Alert from 'components/Alert';

function Checkout() {
	const dispatch = useDispatch();

	const total = useSelector(selectCartPriceTotal);

	const orderError = useSelector(selectOrderError);

	const history = useHistory();

	const [loading, setLoading] = useState(false);

	const onCheckout = async () => {
		setLoading(true);

		const result = await dispatch(checkoutOrder(total));

		if (checkoutOrder.fulfilled.match(result)) {
			dispatch(cleanCart());
			history.push('/orders');
		}

		setLoading(false);
	};

	return (
		<>
			{orderError && (
				<Alert
					message={orderError.message}
					close={() => dispatch(cleanOrderError())}
				/>
			)}
			<div className="flex md:flex-row flex-col md:space-x-6 space-y-8 md:space-y-0 p-2">
				<Cart />
				<div className="flex flex-col shadow-xl rounded-lg bg-gray-800 text-white p-6 space-y-6">
					<h1 className="text-4xl font-base tracking-wider text-center">
						Checkout
					</h1>
					<div className="flex flex-col-reverse md:h-50v">
						<button
							onClick={onCheckout}
							disabled={loading}
							className="p-4 bg-white text-gray-800 rounded-lg tracking-wider font-bold disabled:bg-gray-200"
						>
							Proceed Checkout
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Checkout;
