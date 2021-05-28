import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, getServerTime, getTimestamp } from '../../config/firebase';

//redux thunk allow to async, basicly use fetch api
export const fetchProduct = createAsyncThunk(
	'product/fetchProduct',
	async (_, { rejectWithValue }) => {
		try {
			const snapshot = await db
				.collection('products')
				.orderBy('timestamp', 'desc')
				.get();

			return snapshot.docs.map((doc) => ({
				id: doc.id,
				name: doc.data().name,
				catalog: doc.data().catalog,
				price: doc.data().price,
				description: doc.data().description,
				created_at: doc.data().timestamp.toDate().toString(),
			}));
		} catch (err) {
			return rejectWithValue({ message: err.message, code: err.code });
		}
	}
);
//redux thunk allow to async, basicly use fetch api
export const fetchProductById = createAsyncThunk(
	'product/fetchProductById',
	async (id, { rejectWithValue }) => {
		try {
			const product = await db.collection('products').doc(id).get();

			return {
				id: product.id,
				name: product.data().name,
				catalog: product.data().catalog,
				price: product.data().price,
				description: product.data().description,
			};
		} catch (err) {
			return rejectWithValue({ message: err.message, code: err.code });
		}
	}
);

export const createProduct = createAsyncThunk(
	'product/createProduct',
	async ({ name, catalog, price, description }, { rejectWithValue }) => {
		try {
			const product = await db.collection('products').add({
				name: name,
				catalog: catalog,
				price: price,
				description: description,
				timestamp: getServerTime,
			});

			return {
				id: product.id,
				name: name,
				catalog: catalog,
				price: price,
				description: description,
				created_at: getTimestamp.toDate().toString(),
			};
		} catch (err) {
			return rejectWithValue({ message: err.message, code: err.code });
		}
	}
);
export const updateProduct = createAsyncThunk(
	'product/updateProduct',
	async ({ id, name, catalog, price, description }, { rejectWithValue }) => {
		try {
			await db.collection('products').doc(id).update({
				name: name,
				catalog: catalog,
				price: price,
				description: description,
			});

			return {
				id: id,
				name: name,
				catalog: catalog,
				price: price,
				description: description,
				created_at: getTimestamp.toDate().toString(),
			};
		} catch (err) {
			return rejectWithValue({ message: err.message, code: err.code });
		}
	}
);
export const deleteProduct = createAsyncThunk(
	'product/deleteProduct',
	async (id, { rejectWithValue }) => {
		try {
			await db.collection('products').doc(id).delete();
			return { id: id };
		} catch (err) {
			return rejectWithValue({ message: err.message, code: err.code });
		}
	}
);

export const searchProduct = createAsyncThunk(
	'product/searchProduct',
	async ({ name, price }, { rejectWithValue }) => {
		return;
	}
);
