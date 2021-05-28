import React from 'react';

function Alert({ message, close }) {
	return (
		<div className="flex items-center p-3 bg-blue-200 text-blue-800 font-bold  rounded-lg">
			<span className=" flex-1  tracking-widest font-md">{message}</span>
			<button
				onClick={close}
				className="font-bold py-1 px-2 bg-blue-300 rounded-lg"
			>
				X
			</button>
		</div>
	);
}

export default Alert;
