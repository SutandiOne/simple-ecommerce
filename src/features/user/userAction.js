import { auth, db, getServerTime, getTimestamp } from '../../config/firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (uid, { rejectWithValue, getState }) => {
		try {
			const { loading } = getState().user;

			if (loading) return rejectWithValue();

			const userData = await db.collection('users').doc(uid).get();

			return {
				uid: userData.id,
				displayName: userData.data().displayName,
				email: userData.data().email,
				createdAt: userData.data().timestamp.toDate().toString(),
				isAdmin: userData.data().isAdmin,
			};
		} catch (err) {
			return rejectWithValue();
		}
	}
);

//redux thunk allow to async, basicly use fetch api
export const fetchLogin = createAsyncThunk(
	'user/fetchLogin',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const { user } = await auth.signInWithEmailAndPassword(email, password);

			const userData = await db.collection('users').doc(user.uid).get();

			return {
				uid: user.uid,
				displayName: userData.data().displayName,
				email: user.email,
				createdAt: userData.data().timestamp.toDate().toString(),
				isAdmin: userData.data().isAdmin,
			};
		} catch (err) {
			// console.log(err.code);
			return rejectWithValue({ message: err.message, code: err.code });
		}
	}
);

//redux thunk allow to async, basicly use fetch api
export const fetchRegister = createAsyncThunk(
	'user/fetchRegister',
	async ({ username, email, password }, { rejectWithValue }) => {
		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await db.collection('users').doc(user.uid).set({
				displayName: username,
				email: user.email,
				timestamp: getServerTime,
			});

			return {
				uid: user.uid,
				displayName: username,
				email: user.email,
				createdAt: getTimestamp.toDate().toString(),
			};
		} catch (err) {
			// console.log(err.code);
			return rejectWithValue({ message: err.message, code: err.code });
		}
	}
);
