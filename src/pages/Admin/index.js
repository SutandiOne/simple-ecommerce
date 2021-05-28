import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'features/user/userSlice';

function Admin() {
	const user = useSelector(selectUser);

	return (
		<>
			<h1 className="text-4xl text-center mt-24 font-thin tracking-widest font-mono">
				Welcome back!, {user.displayName}
			</h1>
		</>
	);
}

export default Admin;
