import { createSlice } from '@reduxjs/toolkit';

// import thunk
import { fetchOrder, fetchOrderById, checkoutOrder } from './orderAction';

// tempat deklarasi state awal dari value
const initialState = {
	data: [],
	error: null,
	show: [],
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		cleanOrderError: (state) => {
			state.error = null;
		},
	},
	extraReducers: {
		[fetchOrder.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.error = null;
		},
		[fetchOrder.rejected]: (state, action) => {
			state.error = action.payload;
		},
		[fetchOrderById.fulfilled]: (state, action) => {
			state.show = action.payload;
			state.error = null;
		},
		[fetchOrderById.rejected]: (state, action) => {
			state.error = action.payload;
		},
		[checkoutOrder.fulfilled]: (state, action) => {
			state.token = action.payload.data;
			state.error = null;
		},
		[checkoutOrder.rejected]: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const { cleanOrderError } = orderSlice.actions;

export const selectOrder = (state) => state.order.data;
export const selectOrderShow = (state) => state.order.show;
export const selectOrderError = (state) => state.order.error;
export const selectOrderStatus = (state) => state.order.status;

export default orderSlice.reducer;
