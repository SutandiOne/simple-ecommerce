import React from 'react';
import { useForm } from 'react-hook-form';
import { rules } from 'features/user/userModel';

import { auth } from 'config/firebase';
import { useHistory } from 'react-router';
function Recovery() {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setError,
	} = useForm();

	const history = useHistory();

	const onSubmit = ({ email }) => {
		console.log(email);

		auth
			.sendPasswordResetEmail(email, { url: 'http://localhost:3000/login' })
			.then(() => {
				history.push('/login');
			})
			.catch((error) => {
				setError('email', { type: 'manual', message: error.message });
			});
	};

	return (
		<div className="flex flex-col">
			<h1 className="page-title">Recovery Account</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="page-body text-center leading-6">
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
					<button type="submit" className="btn-submit">
						Send Reset Password
					</button>
				</div>
			</form>
		</div>
	);
}

export default Recovery;
