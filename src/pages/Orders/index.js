import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectOrder } from 'features/order/orderSlice';
import { fetchOrder } from 'features/order/orderAction';
import { useHistory } from 'react-router';

function Orders() {
	const order = useSelector(selectOrder);
	const history = useHistory();

	const dispatch = useDispatch();
	useEffect(() => {
		const unsub = () => {
			dispatch(fetchOrder());
		};
		unsub();
	}, [dispatch]);

	const onInvoice = (id) => {
		history.push(`/orders/${id}`);
	};

	return (
		<div className="flex flex-col">
			<h1 className="page-title">My Orders</h1>
			<div className="flex flex-col page-body-xl space-y-4">
				{order?.map((od) => (
					<div
						key={od.id}
						className="flex items-center bg-gray-100 p-4 space-x-6"
					>
						<div className="flex-1 flex flex-col space-y-2">
							<span className="text-xs">Order ID</span>
							<span className="font-bold">{od.id}</span>
						</div>
						<div className="flex flex-col space-y-2 w-60">
							<span className="text-xs">Date Order</span>
							<span className="text-xs">{od.created_at}</span>
						</div>
						<div className="text-2xl font-bold w-20">{od.total_price} $</div>
						<div className="capitalize p-2 bg-yellow-100 rounded-full">
							{od.payment_status}
						</div>
						<button
							onClick={() => onInvoice(od.id)}
							className="p-4 bg-white shadow-md hover:bg-gray-100 tracking-wider"
						>
							Invoice
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Orders;
