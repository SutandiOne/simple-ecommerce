import React from 'react';

import { useSelector } from 'react-redux';
import { selectUser } from 'features/user/userSlice';
import { Route, Redirect } from 'react-router-dom';

//route untuk guest
const GuestRoute = ({ children, ...rest }) => {
	//ambil data dari redux
	const user = useSelector(selectUser);

	return (
		<Route {...rest}>{!user ? children : <Redirect to="/dashboard" />}</Route>
	);
};
export default GuestRoute;
