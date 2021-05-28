import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
	cleanProductError,
	cleanProductForm,
	selectProductForm,
} from 'features/product/productSlice';
import { createProduct, updateProduct } from 'features/product/productAction';
import { useForm } from 'react-hook-form';
import { rules } from 'features/product/productModel';
import Editor from 'components/Editor';

function ProductForm({ close }) {
	const product = useSelector(selectProductForm);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		control,
	} = useForm();

	const dispatch = useDispatch();

	const [name, setName] = useState(product ? product.name : '');
	const [catalog, setCatalog] = useState(product ? product.catalog : '');
	const [price, setPrice] = useState(product ? product.price : 0);
	const [description] = useState(product ? product.description : '');

	const [loading, setLoading] = useState(false);

	const onSave = async (name, catalog, price, description) => {
		const result = await dispatch(
			updateProduct({
				id: product.id,
				name: name,
				catalog: catalog,
				price: parseInt(price),
				description: description,
			})
		);

		if (updateProduct.rejected.match(result)) {
			let { message } = result.payload;
			setError('name', { type: 'manual', message });
			dispatch(cleanProductError());
			setLoading(false);
		}

		if (updateProduct.fulfilled.match(result)) {
			dispatch(cleanProductForm());
			setLoading(false);
			close();
		}
	};

	const onSubmit = async ({ name, catalog, price, description }) => {
		setLoading(true);
		if (product) return onSave(name, catalog, price, description);
		const result = await dispatch(
			createProduct({
				name,
				catalog,
				price: parseInt(price),
				description: description,
			})
		);
		if (createProduct.rejected.match(result)) {
			let { message } = result.payload;
			setError('name', { type: 'manual', message });
			dispatch(cleanProductError());
			setLoading(false);
		}
		if (createProduct.fulfilled.match(result)) {
			setLoading(false);
			close();
		}
	};

	return (
		<div className="fixed z-10 inset-0 overflow-y-auto" role="dialog">
			<div className="flex items-end justify-center md:min-h-screen h-3/4 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div
					className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
					aria-hidden="true"
					onClick={close}
				></div>

				<div className="inline-block align-bottom bg-white text-left border-2 border-gray-600 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  md:w-1/2 w-full">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<h3 className="text-4xl pb-3 tracking-widest break-words font-thin">
								{product ? 'Change' : 'Add'} Product
							</h3>
							<hr className="mb-3 p-1 bg-blue-800" />
							<span>{loading && 'loading..'}</span>
							{product && (
								<div className="flex flex-col">
									<span className="input-text bg-gray-300">
										ID {product?.id}
									</span>
								</div>
							)}
							<div className="flex flex-col">
								<input
									type="text"
									{...register('name', rules.name)}
									value={name}
									className="input-text"
									placeholder="name"
									onChange={(e) => setName(e.target.value)}
								/>
								<span className="text-red-800 text-xs mt-1 tracking-wider">
									{errors.name?.message}
								</span>
								<select
									{...register('catalog', rules.catalog)}
									className="input-text"
									value={catalog}
									onChange={(e) => setCatalog(e.target.value)}
								>
									<option default value="">
										Selected Catalog
									</option>
									<option value="men">Men</option>
									<option value="women">Women</option>
									<option value="false">False</option>
								</select>
								<span className="text-red-800 text-xs mt-1 tracking-wider">
									{errors.catalog?.message}
								</span>
								<input
									type="number"
									{...register('price', rules.price)}
									value={price}
									className="input-text"
									placeholder="price"
									onChange={(e) => setPrice(e.target.value)}
								/>
								<span className="text-red-800 text-xs mt-1 tracking-wider">
									{errors.price?.message}
								</span>

								<Editor
									control={control}
									defaultValue={description}
									rules={rules.description}
								/>
								<span className="text-red-800 text-xs mt-1 tracking-wider">
									{errors.description?.message}
								</span>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							<button
								type="submit"
								className="w-full inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-blue-800 disabled:opacity-50 text-base font-medium text-white hover:bg-blue-700  sm:ml-3 sm:w-auto sm:text-sm"
								disabled={loading}
							>
								Save
							</button>
							<button
								onClick={close}
								type="button"
								className="mt-3 w-full inline-flex justify-center border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ProductForm;
