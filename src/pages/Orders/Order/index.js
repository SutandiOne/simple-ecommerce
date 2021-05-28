import React, { useEffect } from 'react';

import { Redirect, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderError, selectOrderShow } from 'features/order/orderSlice';
import { fetchOrderById } from 'features/order/orderAction';

function Order() {
	const { id } = useParams();

	const dispatch = useDispatch();

	const order = useSelector(selectOrderShow);
	const error = useSelector(selectOrderError);

	useEffect(() => {
		const unsub = () => {
			dispatch(fetchOrderById(id));
		};
		unsub();
	}, [id, dispatch]);

	const payment = (token) => {
		window.snap.pay(token);
	};

	return (
		<>
			{error && <Redirect to="/orders" />}

			<div className="flex flex-col">
				<h1 className="page-title">Order</h1>

				<div className="page-body-order flex space-x-12">
					<div className="flex flex-col w-full">
						<div className="flex border-b-2 border-black tracking-wider items-center">
							<label className="flex-none bg-gray-100 p-4 font-bold w-44">
								Order ID
							</label>
							<span className="flex-1 bg-gray-200 p-4">{order.id}</span>
						</div>
						<div className="flex border-b-2 border-black tracking-wider items-center">
							<label className="flex-none bg-gray-100 p-4 font-bold w-44">
								Order Date
							</label>
							<span className="flex-1 bg-gray-200 p-4">{order.created_at}</span>
						</div>
						<div className="flex border-b-2 border-black tracking-wider items-center">
							<label className="flex-none bg-gray-100 p-4 font-bold w-44">
								Payment Status
							</label>
							<span className="flex-1 bg-gray-200 p-4">
								{order.payment_status}{' '}
							</span>
						</div>
					</div>
					<div className="flex flex-col p-2 w-full ">
						<span className="text-md font-bold uppercase mb-2">Product</span>
						{order.products?.map((cart, index) => (
							<div
								key={cart.id}
								className="flex md:flex-row flex-col items-center border-b-2 border-gray-100 mb-1"
							>
								<div className="flex-1 flex items-center">
									<div className="text-3xl text-base pr-6 text-blue-800">
										{index}
									</div>
									<div className="flex-1 flex flex-col p-3">
										<h3 className="text-xl tracking-wider">{cart.name}</h3>
										<span className="text-xs text-gray-600">
											{cart.catalog}
										</span>
									</div>
									<div className="flex-1 flex flex-col p-3">
										<h3 className="text-xl tracking-wider">
											{cart.qty} x {cart.price}$
										</h3>
									</div>
									<p className="font-bold text-2xl pr-16">
										{cart.price * cart.qty} $
									</p>
								</div>
							</div>
						))}
						<span className="text-3xl tracking-wider text-right mt-6 text-green-900">
							Total Price : {order.total_price} $
						</span>
					</div>
				</div>

				<div className="mx-auto mt-12 flex space-x-2">
					{order.payment_status === 'pending' && (
						<button
							onClick={() => payment(order.payment_details.token)}
							className="p-4 bg-blue-800 text-white font-bold text-xl rounded-lg tracking-widest"
						>
							Pay with Midtrans
						</button>
					)}
				</div>
			</div>
		</>
	);
}

export default Order;
