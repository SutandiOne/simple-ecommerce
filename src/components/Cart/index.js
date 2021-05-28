import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
	plusQty,
	minusQty,
	removeCart,
	selectCart,
	selectCartPriceTotal,
} from 'features/cart/cartSlice';

import {
	FaChevronUp,
	FaDollarSign,
	FaMinus,
	FaPlus,
	FaTrash,
} from 'react-icons/fa';
import Alert from 'components/Alert';

function Cart() {
	const carts = useSelector(selectCart);
	const total = useSelector(selectCartPriceTotal);
	const dispatch = useDispatch();

	const onRemove = (id) => {
		dispatch(removeCart({ id }));
	};

	const onPlus = (id) => {
		dispatch(plusQty({ id }));
	};

	const onMinus = (id) => {
		dispatch(minusQty({ id }));
	};
	return (
		<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 h-screen flex flex-col shadow-xl rounded-lg text-left flex-1">
			<h1 className="page-title font-bold">Your Cart</h1>
			<span className="text-md text-gray-600 -mt-10 text-center mb-10 tracking-wider">
				You have {carts.length} items in your cart
			</span>
			<hr className=" bg-gray-200" />
			<div className=" h-40v overflow-y-auto flex flex-col">
				{carts.length < 1 && <Alert message="No Items Cart" />}
				{carts.map((cart) => (
					<div
						key={cart.id}
						className="flex md:flex-row flex-col items-center border-b-2 border-gray-100 mb-1"
					>
						<div className="flex-1 flex items-center">
							<div className="text-3xl text-base pr-6 text-blue-800">
								<FaChevronUp />
							</div>
							<div className="flex-1 flex flex-col p-3">
								<h3 className="text-xl tracking-wider">{cart.name}</h3>
								<span className="text-xs text-gray-600">{cart.catalog}</span>
							</div>
							<p className="font-bold text-2xl pr-16">{cart.price} $</p>
						</div>
						<div className="flex items-center">
							<div className="flex items-center space-x-2 mx-2">
								<button
									type="button"
									className="p-2 text-sm font-medium rounded-md text-black bg-gray-100 hover:bg-gray-200"
									onClick={() => onPlus(cart.id)}
								>
									<FaPlus />
								</button>
								<label className="p-2 font-bold w-16 text-center bg-gray-200 rounded-lg ">
									{cart.qty}
								</label>

								<button
									type="button"
									className="p-2 text-sm font-medium rounded-md text-black bg-gray-100 hover:bg-gray-200"
									onClick={() => onMinus(cart.id)}
								>
									<FaMinus />
								</button>
							</div>
							<div className="flex flex-col mx-6">
								<button
									type="button"
									className="p-4 text-base font-medium rounded-full text-red-100 bg-red-700 hover:bg-red-800"
									onClick={() => onRemove(cart.id)}
								>
									<FaTrash />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
			{total >= 1 && (
				<div className=" text-right flex flex-row-reverse mt-4">
					<span className="p-2 bg-green-100 rounded-md flex items-center space-x-2">
						<span className="text-4xl">{total}</span>
						<span className="text-xl p-3 bg-green-500 rounded-full text-white">
							<FaDollarSign />
						</span>
					</span>
				</div>
			)}
		</div>
	);
}

export default Cart;
