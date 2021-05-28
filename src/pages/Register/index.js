import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { cleanUserError, selectUserError } from 'features/user/userSlice';
import { fetchRegister } from 'features/user/userAction';

import { useForm } from 'react-hook-form';
import { rules } from 'features/user/userModel';

function Register() {
	const {
		handleSubmit,
		register,
		formState: { errors },
		getValues,
		setError,
	} = useForm();

	const dispatch = useDispatch();

	const error = useSelector(selectUserError);

	const onSubmit = (user) => {
		dispatch(fetchRegister(user));
	};

	useEffect(() => {
		const unsub = () => {
			if (!error) return;

			setError('email', { type: 'manual', message: error.message });
			dispatch(cleanUserError());
		};
		unsub();
	}, [error, setError, dispatch]);

	return (
		<div className="flex flex-col">
			<h1 className="page-title">Register Page</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="page-body">
					<div>
						<input
							{...register('username', rules.username)}
							type="text"
							className=" input-text"
							placeholder="Username"
						/>
						{errors.username && (
							<span className="input-error">{errors.username.message}</span>
						)}
					</div>
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
					<div>
						<input
							{...register('repassword', {
								required: {
									value: true,
									message: 'Confirm Password tidak boleh kosong.',
								},
								validate: {
									matchesPreviousPassword: (value) => {
										const { password } = getValues();
										return password === value || 'Confirm Password harus sama!';
									},
								},
							})}
							type="password"
							className=" input-text"
							placeholder="Confirm Password"
						/>

						{errors.repassword && (
							<span className="input-error">{errors.repassword.message}</span>
						)}
					</div>
					<button type="submit" className="btn-submit">
						Register
					</button>
				</div>
			</form>
		</div>
	);
}

export default Register;
