import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';

// import thunk
import {
	fetchProduct,
	createProduct,
	fetchProductById,
	deleteProduct,
	updateProduct,
} from './productAction';

// tempat deklarasi state awal dari value
const initialState = {
	data: [],
	form: null,
	error: null,
	search: [],
	status: false,
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		// add: (state, action) => {
		// 	state.data.push(action.payload);
		// },
		cleanProductForm: (state) => {
			state.form = null;
		},
		cleanProductError: (state) => {
			state.error = null;
		},
		cleanProductSearch: (state) => {
			state.search = state.data;
			state.error = null;
		},
		searchProduct: (state, action) => {
			let product = state.data;

			if (action.payload.name !== '')
				product = product.filter((product) =>
					product.name.toLowerCase().includes(action.payload.name.toLowerCase())
				);
			if (action.payload.price !== 0)
				product = product.filter(
					(product) => product.price <= action.payload.price
				);

			state.search = product;
		},
	},
	extraReducers: {
		[fetchProduct.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.search = action.payload;
			state.status = true;
			state.error = null;
		},
		[fetchProduct.rejected]: (state, action) => {
			state.error = action.payload;
		},
		[fetchProductById.fulfilled]: (state, action) => {
			state.form = action.payload;
			state.error = null;
		},
		[fetchProductById.rejected]: (state, action) => {
			state.error = action.payload;
		},
		[createProduct.fulfilled]: (state, action) => {
			state.data.push(action.payload);
			state.error = null;
		},
		[createProduct.rejected]: (state, action) => {
			state.error = action.payload;
		},
		[updateProduct.fulfilled]: (state, action) => {
			// with spesifik state
			// const product = state.data.find(
			// 	(product) => (product.id = action.payload.id)
			// );

			// if (product) {
			// 	product.name = action.payload.name;
			// }

			const product = (state.data = state.data.filter(
				(product) => product.id !== action.payload.id
			));

			if (product) {
				product.push(action.payload);
			}

			state.error = null;
		},
		[updateProduct.rejected]: (state, action) => {
			state.error = action.payload;
		},
		[deleteProduct.fulfilled]: (state, action) => {
			state.data = state.data.filter(
				(product) => product.id !== action.payload.id
			);
			state.error = null;
		},
		[deleteProduct.rejected]: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const {
	cleanProductError,
	cleanProductForm,
	searchProduct,
	cleanProductSearch,
} = productSlice.actions;

export const selectProduct = (state) => state.product.data;
export const selectProductForm = (state) => state.product.form;
export const selectProductSearch = (state) => state.product.search;
export const selectProductError = (state) => state.product.error;
export const selectProductStatus = (state) => state.product.status;

export const selectProductCatalog = (catalog) => {
	return createDraftSafeSelector(selectProductSearch, (state) =>
		state.filter((product) => product.catalog === catalog)
	);
};
export const selectProductbyId = (id) => {
	return createDraftSafeSelector(selectProduct, (state) =>
		state.find((product) => product.id === id)
	);
};

export default productSlice.reducer;
