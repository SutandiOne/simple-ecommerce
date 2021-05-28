import React, { useEffect } from 'react';
import './app.css';

import { Route, Switch } from 'react-router-dom';

import GuestRoute from './components/GuestRoute';
import GuardRoute from './components/GuardRoute';
import AdminRoute from './components/AdminRoute';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import Search from './pages/Search';
import Register from './pages/Register';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Product from './pages/Admin/Product';
import { useSelector } from 'react-redux';
import { logoutUser, selectUser } from './features/user/userSlice';
import { auth } from './config/firebase';
import { useDispatch } from 'react-redux';
import { fetchUser } from './features/user/userAction';
import ProductDetail from 'pages/ProductDetail';
import Checkout from 'pages/Checkout';
import Orders from 'pages/Orders';
import Order from 'pages/Orders/Order';

function App() {
	// const [userData] = useDocument(user && db.collection('users').doc(user.uid));

	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		const unsub = () => {
			if (user) return;

			auth.onAuthStateChanged((userAuth) => {
				if (userAuth) {
					dispatch(fetchUser(userAuth.uid));
				} else {
					dispatch(logoutUser());
				}
			});
		};

		unsub();
	}, [dispatch, user]);

	return (
		<div className="flex flex-col">
			<Switch>
				<GuestRoute path="/login" exact>
					<MainLayout>
						<Login />
					</MainLayout>
				</GuestRoute>
				<GuestRoute path="/registration" exact>
					<MainLayout>
						<Register />
					</MainLayout>
				</GuestRoute>
				<GuestRoute path="/recovery" exact>
					<MainLayout>
						<Recovery />
					</MainLayout>
				</GuestRoute>
				<GuardRoute path="/profile" exact>
					<MainLayout>
						<Profile />
					</MainLayout>
				</GuardRoute>
				<GuardRoute path="/checkout" exact>
					<MainLayout>
						<Checkout />
					</MainLayout>
				</GuardRoute>
				<GuardRoute path="/orders" exact>
					<MainLayout>
						<Orders />
					</MainLayout>
				</GuardRoute>
				<GuardRoute path="/orders/:id" exact>
					<MainLayout>
						<Order />
					</MainLayout>
				</GuardRoute>
				<GuardRoute path="/dashboard" exact>
					<MainLayout>
						<Dashboard />
					</MainLayout>
				</GuardRoute>
				<AdminRoute path="/admin" exact>
					<AdminLayout>
						<Admin />
					</AdminLayout>
				</AdminRoute>
				<AdminRoute path="/admin/product" exact>
					<AdminLayout>
						<Product />
					</AdminLayout>
				</AdminRoute>
				<Route path="/product/:id" exact>
					<MainLayout>
						<ProductDetail />
					</MainLayout>
				</Route>
				<Route path="/search" exact>
					<MainLayout>
						<Search />
					</MainLayout>
				</Route>

				<Route path="/*" exact>
					<MainLayout>
						<Home />
					</MainLayout>
				</Route>
			</Switch>
		</div>
	);
}

export default App;
