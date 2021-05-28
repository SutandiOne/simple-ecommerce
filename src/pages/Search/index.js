import React, { useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
	searchProduct,
	selectProductSearch,
	selectProductCatalog,
	selectProductStatus,
	cleanProductSearch,
} from 'features/product/productSlice';
import { fetchProduct } from 'features/product/productAction';
import { addCart } from 'features/cart/cartSlice';

import { useForm } from 'react-hook-form';
import { rules } from 'features/product/productModel';

import Alert from 'components/Alert';

function Search() {
	const dispatch = useDispatch();

	const useQuery = () => new URLSearchParams(useLocation().search);

	const catalog = useQuery().get('catalog');

	const status = useSelector(selectProductStatus);

	const product = useSelector(
		catalog ? selectProductCatalog(catalog) : selectProductSearch
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	useEffect(() => {
		const unsub = () => {
			if (status) return;
			if (product.length > 0) return;
			dispatch(fetchProduct());
		};
		unsub();
	}, [dispatch, product, status]);

	const onCleanSearch = () => {
		dispatch(cleanProductSearch());
		reset();
	};

	const onCart = ({ id, name, catalog, price }) => {
		dispatch(addCart({ id, name, catalog, price, qty: 1 }));
	};

	const onSubmit = async ({ name, price }) => {
		dispatch(searchProduct({ name, price }));
	};
	return (
		<div className="flex flex-col">
			<h1 className="page-title">Browse Product</h1>
			<div className="relative -mt-11">
				<div className="absolute md:inset-4 inset-3 flex items-center">
					<div className="w-full border-t border-gray-800"></div>
				</div>
				<div className="relative flex justify-center md:text-xl text-lg font-thin ">
					<span className="px-2 text-black bg-gray-100 uppercase ">
						{catalog || 'General'}
					</span>
				</div>
			</div>
			<div className="flex flex-col md:flex-row p-4">
				<div className="flex">
					<div className="flex flex-col bg-white shadow-md p-6 md:w-96 w-full rounded-lg">
						<h1 className="flex text-4xl font-thin tracking-wider text-center mb-4">
							Filter
						</h1>
						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
							<input
								{...register('name', rules.name)}
								type="text"
								className="flex-1 input-text active:outline-none"
								placeholder="Search.."
							/>
							<span className="text-red-800 text-xs mt-1 tracking-wider">
								{errors.name?.message}
							</span>
							<input
								{...register('price', rules.price)}
								type="number"
								className="flex-1 input-text active:outline-none"
								placeholder="Max Price"
							/>
							<span className="text-red-800 text-xs mt-1 tracking-wider">
								{errors.price?.message}
							</span>
							<button
								type="submit"
								className=" tracking-wider text-md bg-gray-800 text-white p-3 mt-6 rounded-lg"
							>
								Apply Filter
							</button>
						</form>
						<h1 className="text-2xl tracking-wider text-center mt-6 mb-4">
							Catalog
						</h1>
						<div className="flex space-x-4">
							<Link
								to="?catalog=men"
								className=" text-lg tracking-wider bg-gray-200 hover:bg-gray-300 shadow-sm text-black w-full py-2 text-center rounded-lg"
							>
								Men
							</Link>
							<Link
								to="?catalog=women"
								className=" text-lg tracking-wider bg-gray-200 hover:bg-gray-300 shadow-sm text-black w-full py-2 text-center rounded-lg"
							>
								Women
							</Link>
						</div>
						<Link
							to="/search"
							onClick={onCleanSearch}
							className="text-center tracking-wider text-md bg-red-800 text-white p-3 mt-12 rounded-lg"
						>
							Reset Filter
						</Link>
					</div>
				</div>
				<div className="flex-1 md:pl-8">
					{product.length < 1 && status && <Alert message="Search Not Found" />}
					<div className="flex flex-wrap">
						{!status && 'loading...'}
						{product?.map((p) => (
							<div key={p.id} className="w-full md:w-80 justify-center">
								<div className="w-full p-4">
									<div className="card flex flex-col justify-center p-8 bg-white rounded-lg shadow-md">
										<div className="prod-title">
											<Link
												to={`product/${p.id}`}
												className="text-lg uppercase text-gray-900 font-bold"
											>
												{p.name}
											</Link>
											<p className="uppercase text-sm text-gray-400">
												{p.catalog}
											</p>
										</div>

										<div className="mt-6">
											<div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
												<p className="font-bold text-xl">{p.price} $</p>
												<button
													onClick={() => onCart(p)}
													className="md:mt-0 mt-4 px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
												>
													Add to cart
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Search;
