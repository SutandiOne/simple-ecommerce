import React from 'react';

import Cart from 'components/Cart';
import { Link } from 'react-router-dom';

function CartContainer({ close }) {
	return (
		<div className="fixed z-10 inset-0" role="dialog">
			<div className="flex pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div
					className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
					aria-hidden="true"
					onClick={close}
				></div>

				<div className="inline-block align-bottom transform transition-all sm:my-8 sm:align-middle md:w-1/2 w-full">
					<Cart />
					<Link
						to="/checkout"
						onClick={close}
						className="btn-submit text-center font-bold"
					>
						Checkout
					</Link>
				</div>
			</div>
		</div>
	);
}

export default CartContainer;
