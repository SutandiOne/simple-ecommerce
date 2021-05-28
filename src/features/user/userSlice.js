import { createSlice } from '@reduxjs/toolkit';

import { fetchLogin, fetchRegister, fetchUser } from './userAction';

// tempat deklarasi state awal dari value
const initialState = {
	data: null,
	error: null,
	loading: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logoutUser: () => {
			return initialState;
		},
		cleanUserError: (state) => {
			state.error = null;
			state.loading = false;
		},
	},
	extraReducers: {
		[fetchUser.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.error = null;
		},
		[fetchUser.rejected]: (state, action) => {
			state.error = action.payload;
		},
		[fetchLogin.pending]: (state) => {
			state.loading = true;
		},
		[fetchLogin.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.error = null;
			state.loading = false;
		},
		[fetchLogin.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		[fetchRegister.pending]: (state) => {
			state.loading = true;
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.error = null;
			state.loading = false;
		},
		[fetchRegister.rejected]: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

//untuk define action
export const { logoutUser, cleanUserError } = userSlice.actions;

//untuk define data user dalam state
export const selectUser = (state) => state.user.data;
export const selectUserError = (state) => state.user.error;

//untuk mendaftarkan di store.js
export default userSlice.reducer;
