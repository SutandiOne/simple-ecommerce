import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';

// tempat deklarasi state awal dari value
const initialState = {
	data: [],
	error: null,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addCart: (state, action) => {
			const cart = state.data.find((cart) => cart.id === action.payload.id);
			if (cart) {
				cart.qty++;
			} else {
				state.data.push(action.payload);
			}
		},
		removeCart: (state, action) => {
			const cart = state.data.filter((cart) => cart.id !== action.payload.id);
			state.data = cart;
		},
		plusQty: (state, action) => {
			const cart = state.data.find((cart) => cart.id === action.payload.id);
			if (cart) {
				cart.qty++;
			}
		},
		minusQty: (state, action) => {
			const cart = state.data.find((cart) => cart.id === action.payload.id);
			if (cart) {
				if (cart.qty <= 1) {
					const cart = state.data.filter(
						(cart) => cart.id !== action.payload.id
					);
					state.data = cart;
				} else {
					cart.qty--;
				}
			}
		},
		cleanCartError: (state) => {
			state.error = null;
		},
		cleanCart: () => {
			return initialState;
		},
	},
});

//untuk define action
export const {
	addCart,
	removeCart,
	plusQty,
	minusQty,
	cleanCartError,
	cleanCart,
} = cartSlice.actions;

//untuk define data user dalam state
export const selectCart = (state) => state.cart.data;
export const selectCartError = (state) => state.cart.error;

export const selectCartPriceTotal = createDraftSafeSelector(
	selectCart,
	(state) =>
		state.reduce((total, cart) => (total = total + cart.price * cart.qty), 0)
);

//untuk mendaftarkan di store.js
export default cartSlice.reducer;
