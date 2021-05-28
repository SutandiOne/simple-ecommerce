import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectProduct,
	cleanProductError,
	selectProductStatus,
	selectProductError,
} from 'features/product/productSlice';
import {
	fetchProduct,
	fetchProductById,
	deleteProduct,
} from 'features/product/productAction';
import { headerTable } from 'features/product/productModel';
import Table from '../Table';
import Alert from '../Alert';
import ConfirmBox from '../ConfirmBox';

function ProductContainer({ showForm }) {
	const product = useSelector(selectProduct);
	const status = useSelector(selectProductStatus);
	const error = useSelector(selectProductError);
	const dispatch = useDispatch();
	const columns = useMemo(() => headerTable, []);

	const [confirm, setConfirm] = useState({});

	useEffect(() => {
		const unsub = () => {
			if (status) return;
			if (product.length > 0) return;
			dispatch(fetchProduct());
		};
		unsub();
	}, [dispatch, product, status]);

	const changeForm = async (id) => {
		const result = await dispatch(fetchProductById(id));

		if (fetchProductById.fulfilled.match(result)) {
			showForm();
		}
	};

	const deleteForm = (id) => {
		setConfirm({ id: id, title: 'Delete Product' });
	};

	const onDelete = async (id) => {
		const result = await dispatch(deleteProduct(id));

		if (deleteProduct.fulfilled.match(result)) {
			setConfirm({});
		}
	};

	return (
		<div className="flex flex-col">
			{confirm.id && (
				<ConfirmBox
					confirm={confirm}
					close={() => setConfirm({})}
					executed={onDelete}
				/>
			)}
			{error && (
				<Alert
					message={error.message}
					close={() => dispatch(cleanProductError())}
				/>
			)}
			<Table
				columns={columns}
				data={product}
				changeForm={changeForm}
				deleteForm={deleteForm}
			/>
		</div>
	);
}

export default ProductContainer;
