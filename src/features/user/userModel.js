export const rules = {
	username: {
		required: { value: true, message: 'Username tidak boleh kosong.' },
		maxLength: { value: 30, message: 'Panjang username maksimal 30 karakter' },
	},
	email: {
		required: { value: true, message: 'Email tidak boleh kosong.' },
		pattern: {
			value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			message: 'invalid email address',
		},
		maxLength: { value: 255, message: 'Panjang email maksimal 255 karakter' },
	},
	password: {
		required: { value: true, message: 'Password tidak boleh kosong.' },
		maxLength: {
			value: 255,
			message: 'Panjang password maksimal 255 karakter.',
		},
	},
};
