import React from 'react';
import Clock from 'react-live-clock';
function Moment() {
	return (
		<div className="flex flex-col text-center tracking-wider leading-8">
			<Clock
				className="text-md"
				format={'dddd, MMMM Mo, YYYY'}
				ticking={true}
				// timezone={'Asia/Jakarta'}
			/>
			<Clock
				className="text-2xl font-light"
				format={'HH:mm:ss'}
				ticking={true}
				// timezone={'Asia/Jakarta'}
			/>
		</div>
	);
}

export default Moment;
