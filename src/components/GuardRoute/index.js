import React from 'react';

import { useSelector } from 'react-redux';
import { selectUser } from 'features/user/userSlice';
import { Route, Redirect } from 'react-router-dom';

//route untuk user
const GuardRoute = ({ children, ...rest }) => {
	const user = useSelector(selectUser);

	return <Route {...rest}>{user ? children : <Redirect to="/login" />}</Route>;
};
export default GuardRoute;
