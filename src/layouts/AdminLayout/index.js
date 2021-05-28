import React from 'react';
import { Link } from 'react-router-dom';
import Header from 'components/Header';

function AdminLayout({ children }) {
	return (
		<>
			<Header />
			<div className="w-full h-full">
				<div className="container mx-auto mt-12">
					<div className="flex flex-col">
						<h1 className="page-title">Admin Page</h1>
						<div className="flex md:flex-row flex-col">
							<ul className=" px-4 pt-3 md:h-70v flex md:flex-col overflow-auto md:mr-6 text-center">
								<Link
									to="/admin"
									className="px-12 py-2 m-1 bg-gray-600 text-white rounded-md  text-lg tracking-wider hover:bg-gray-200 hover:text-black"
								>
									Index
								</Link>
								<Link
									to="/admin/product"
									className="px-12 py-2 m-1 bg-gray-600 text-white rounded-md  text-lg tracking-wider hover:bg-gray-200 hover:text-black"
								>
									Product
								</Link>
							</ul>
							<div className="flex-1  p-4 md:h-70v flex flex-col overflow-auto">
								{children}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AdminLayout;
