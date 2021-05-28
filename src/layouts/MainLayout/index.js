import React from 'react';
import Header from 'components/Header';

function MainLayout({ children }) {
	return (
		<>
			<Header />
			<div className="w-full h-auto">
				<div className="container mx-auto mt-12 h-auto">{children}</div>
			</div>
		</>
	);
}

export default MainLayout;
