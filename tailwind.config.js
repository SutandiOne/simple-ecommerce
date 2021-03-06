module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		height: {
			'40v': '40vh',
			'50v': '50vh',
			'60v': '60vh',
			'70v': '70vh',
			'80v': '80vh',
			'90v': '90vh',
			'100v': '100vh',
		},
	},
	variants: {
		extend: {
			opacity: ['disabled'],
		},
	},
	plugins: [],
};
