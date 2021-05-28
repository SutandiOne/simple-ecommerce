import React from 'react';

function ConfirmBox({ close, executed, confirm: { title, id } }) {
	const excuting = () => {
		executed(id);
	};

	return (
		<div className="fixed z-10 inset-0 overflow-y-auto" role="dialog">
			<div className="flex items-end justify-center md:min-h-screen h-3/4 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div
					className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
					aria-hidden="true"
				></div>

				<span
					className="hidden sm:inline-block sm:align-middle sm:h-screen"
					aria-hidden="true"
				>
					&#8203;
				</span>

				<div className="inline-block align-bottom bg-white text-left border-2 border-gray-600 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
					<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<h3 className="text-4xl pb-3 tracking-widest break-words font-thin">
							Confirm {title}
						</h3>
						<hr className="mb-3 p-1 bg-blue-800" />
						{id && (
							<div className="flex flex-col">
								<span className="input-text bg-gray-300">ID {id}</span>
							</div>
						)}
						<p className="p-1 text-lg tracking-widest font-thin">
							Are you sure?, executed this action.
						</p>
					</div>
					<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						<button
							onClick={excuting}
							type="button"
							className="w-full inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-blue-800 text-base font-medium text-white hover:bg-blue-700  sm:ml-3 sm:w-auto sm:text-sm"
						>
							Confirm
						</button>
						<button
							onClick={close}
							type="button"
							className="mt-3 w-full inline-flex justify-center border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ConfirmBox;
