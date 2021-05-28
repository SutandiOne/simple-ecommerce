import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { selectCart } from 'features/cart/cartSlice';
import { Link } from 'react-router-dom';

import Moment from '../Moment';
import CartContainer from 'components/CartContainer';
import { FaRegUserCircle, FaShoppingCart } from 'react-icons/fa';

function Header() {
	const cart = useSelector(selectCart);

	const [modal, setModal] = useState(false);

	const onModal = () => {
		modal === true ? setModal(false) : setModal(true);
	};

	return (
		<div className="flex flex-col w-full bg-white shadow-md p-6 md:flex-row justify-between">
			<div className="md:pl-12 lg:pb-0 pb-8 flex">
				<Link
					to="/"
					className="border-4 p-2 border-blue-900 text-4xl tracking-widest"
				>
					_Storemax
				</Link>
			</div>
			<Moment />
			<div className="flex flex-col md:flex-row items-center text-xl">
				<Link to="/" className="nav-link">
					Home
				</Link>
				<Link to="/search" className="nav-link">
					Search
				</Link>
				<span className="relative m-3 p-2" onClick={onModal}>
					{cart.length >= 1 && (
						<span className="w-5 h-6 rounded-full absolute text-center text-xs font-bold bg-red-700 text-white right-0 top-1">
							{cart.length}
						</span>
					)}
					<FaShoppingCart size="28" />
				</span>
				<Link to="/profile" className="m-4">
					<FaRegUserCircle size="32" />
				</Link>
			</div>
			{modal && <CartContainer close={onModal} />}
		</div>
	);
}

export default Header;
