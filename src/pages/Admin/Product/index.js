import React, { useState } from 'react';

import ProductContainer from 'components/ProductContainer';
import ProductForm from 'components/ProductForm';

function Product() {
	const [Form, setForm] = useState(false);

	const showModal = () => {
		setForm(true);
	};
	const closeModal = () => {
		setForm(false);
	};
	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-2xl tracking-wider border-l-4 border-gray-600 pl-2 ">
					Manage Product
				</h1>
				<button type="button" onClick={showModal} className="btn-add">
					+ Create
				</button>
			</div>
			<br />
			{Form && <ProductForm close={closeModal} />}
			<ProductContainer showForm={showModal} />{' '}
		</>
	);
}

export default Product;
