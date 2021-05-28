import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserError, cleanUserError } from 'features/user/userSlice';
import { fetchLogin } from 'features/user/userAction';
import { useForm } from 'react-hook-form';
import { rules } from 'features/user/userModel';

function Login() {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setError,
	} = useForm();

	const dispatch = useDispatch();

	const error = useSelector(selectUserError);

	const onSubmit = (user) => {
		dispatch(fetchLogin(user));
	};

	useEffect(() => {
		const unsub = () => {
			if (!error) return;
			let field = error.code === 'auth/wrong-password' ? 'password' : 'email';
			setError(field, { type: 'manual', message: error.message });
			// console.log(error.code);
			dispatch(cleanUserError());
		};

		unsub();
	}, [error, setError, dispatch]);

	return (
		<div className="flex flex-col">
			<h1 className="page-title">Login Page</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="page-body">
					<div>
						<input
							{...register('email', rules.email)}
							type="email"
							className=" input-text"
							placeholder="Email"
						/>

						{errors.email && (
							<span className="input-error">{errors.email.message}</span>
						)}
					</div>
					<div>
						<input
							{...register('password', rules.password)}
							type="password"
							className=" input-text"
							placeholder="Password"
						/>

						{errors.password && (
							<span className="input-error">{errors.password.message}</span>
						)}
					</div>

					<button type="submit" className="btn-submit">
						Login
					</button>
				</div>
			</form>
		</div>
	);
}

export default Login;
