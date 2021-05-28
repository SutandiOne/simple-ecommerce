import React from 'react';

import { useSelector } from 'react-redux';
import { selectUser } from 'features/user/userSlice';
import { Redirect } from 'react-router-dom';
import GuardRoute from '../GuardRoute';

//route untuk user
const AdminRoute = ({ children, ...rest }) => {
	const user = useSelector(selectUser);
	return (
		<GuardRoute {...rest}>
			{user?.isAdmin ? children : <Redirect to="/dashboard" />}
		</GuardRoute>
	);
};
export default AdminRoute;
