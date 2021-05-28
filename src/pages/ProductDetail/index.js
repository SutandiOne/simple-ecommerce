import React from 'react';

import { Redirect, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductbyId } from 'features/product/productSlice';
import { addCart } from 'features/cart/cartSlice';

import ShopMens from 'assets/shopMens.jpg';
import ShopWomens from 'assets/shopWomens.jpg';

function ProductDetail() {
	const { id } = useParams();
	const dispatch = useDispatch();

	const product = useSelector(selectProductbyId(id));

	const onCart = ({ id, name, catalog, price }) => {
		dispatch(addCart({ id, name, catalog, price, qty: 1 }));
	};

	return (
		<>
			{!product && <Redirect to="/" />}
			{product && (
				<div className="flex flex-col p-4">
					<h1 className="page-title">Product Detail</h1>
					<div className="flex flex-col md:flex-row bg-white md:h-40v h-auto mx-auto md:w-1/2 w-full shadow-md rounded-xl">
						<img
							src={product.catalog === 'men' ? ShopMens : ShopWomens}
							alt="product"
							className="flex md:w-1/3 w-full rounded-l-xl"
						/>
						<div className="p-8 flex-1 flex flex-col">
							<h1 className="text-3xl tracking-wider font-bold">
								{product.name}
							</h1>
							<span className="mt-6 uppercase text-xl text-gray-400">
								{product.catalog}
							</span>
							<p className="mt-6 text-md text-light tracking-wider leading-6">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
								veritatis quos a, natus nostrum blanditiis harum reiciendis
								tempore. Vel quod accusamus fugiat ipsa corrupti. Adipisci
								tempora eos voluptatum rerum voluptate!
							</p>
							<div className="mt-6">
								<div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
									<p className="font-bold text-3xl">{product.price} $</p>
									<button
										onClick={() => onCart(product)}
										className="md:mt-0 mt-4 px-6 py-2 text-lg transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
									>
										Add to cart
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-8 md:text-lg text-md text-light tracking-wider leading-6 md:w-1/2 w-full mx-auto">
						<div className="relative mt-6">
							<div className="absolute md:inset-4 inset-3 flex items-center">
								<div className="w-full border-t border-gray-800"></div>
							</div>
							<div className="relative flex justify-center md:text-4xl text-2xl leading-5 ">
								<span className="px-2 text-black bg-gray-100 ">
									Description
								</span>
							</div>
						</div>
						<p
							className="mt-12 ck ck-content"
							dangerouslySetInnerHTML={{ __html: product.description }}
						/>
					</div>
				</div>
			)}
		</>
	);
}

export default ProductDetail;
