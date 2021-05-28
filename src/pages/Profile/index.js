import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, selectUser } from 'features/user/userSlice';
import { auth } from 'config/firebase';
import { Link } from 'react-router-dom';
function Profile() {
	const user = useSelector(selectUser);

	const dispatch = useDispatch();

	const onLogout = () => {
		auth.signOut().then(() => {
			dispatch(logoutUser());
		});
	};

	return (
		<div className="flex flex-col">
			<h1 className="page-title">Profile Page</h1>

			<Link to="/admin" className="page-body mb-6 text-center text-2xl">
				Page For Admin
			</Link>
			<Link
				to="/orders"
				className="page-body mb-2 text-center text-xl font-bold tracking-wider uppercase"
			>
				My Orders
			</Link>

			<div className="page-body text-center leading-6">
				<span className="my-2 p-4 bg-gray-200 rounded-full tracking-widest break-words ">
					{user.uid}
				</span>
				<span className="my-2 p-4 bg-gray-200 rounded-full tracking-widest break-words ">
					{user.displayName}
				</span>
				<span className="my-2 p-4 bg-gray-200 rounded-full tracking-widest break-words">
					{user.email}
				</span>
			</div>
			<div className="w-full text-center mt-12">
				<button
					onClick={onLogout}
					className="p-4 bg-red-600 rounded-full tracking-wider text-white hover:bg-red-700 w-24 shadow-md"
				>
					Logout
				</button>
			</div>
		</div>
	);
}
export default Profile;
