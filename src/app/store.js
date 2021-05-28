import {
	combineReducers,
	configureStore,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';
import userReducer from 'features/user/userSlice';
import productReducer from 'features/product/productSlice';
import cartReducer from 'features/cart/cartSlice';
import orderReducer from 'features/order/orderSlice';

//midlleware thunk bawaan redux-toolkit

import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

//use localstorage
import storage from 'redux-persist/lib/storage';

// use encrypt
import { encryptTransform } from 'redux-persist-transform-encrypt';

//use expire
import expireTransform from 'redux-persist-transform-expire-in';

const expireTime = 60 * 60 * 1000; // expire in 20mnt
const expireKey = 'expired_at';

//config redux persist
const persistConfig = (key) => {
	return {
		key: key,
		version: 1,
		storage,
		blacklist: ['error', 'loading'],

		transforms: [
			encryptTransform({
				secretKey: 'secret',
				onError: function (error) {
					// Handle the error.
					console.log(error);
				},
			}),
			expireTransform(expireTime, expireKey, []),
		],
	};
};

// for all reducer
// const persistedReducer = persistReducer(
// 	persistConfig,
// 	// combineReducers({
// 	// 	user: userReducer,
// 	//  product: productReducer
// 	// });
// );

// for spesific reducer
const rootReducer = combineReducers({
	user: persistReducer(persistConfig('auth'), userReducer),
	cart: cartReducer,
	product: productReducer,
	order: orderReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
	// devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
