import React from 'react';
import { Link } from 'react-router-dom';
import ShopMens from 'assets/shopMens.jpg';
import ShopWomens from 'assets/shopWomens.jpg';

function Directory() {
	return (
		<div className="flex md:px-64 md:h-80v h-60v md:flex-row">
			<div
				className="w-full bg-auto bg-cover bg-center bg-no-repeat flex "
				style={{ backgroundImage: `url(${ShopMens})` }}
			>
				<Link to="search?catalog=men" className=" w-full banner">
					Mens
				</Link>
			</div>
			<div
				className="w-full bg-auto bg-cover bg-center bg-no-repeat flex "
				style={{ backgroundImage: `url(${ShopWomens})` }}
			>
				<Link to="search?catalog=women" className=" w-full banner">
					Womens
				</Link>
			</div>
		</div>
	);
}

export default Directory;
