import React from 'react';

const Dashboard = () => {
	return (
		<>
			<div className='section'>
				<h1 className='subtitle is-1'>Download all app data</h1>
				<p>
					We will send a .csv file with all of the collected app data
					to your email address.
				</p>
				<div className='field'>
					<input
						className='input'
						type='email'
						placeholder='email@email.com'
					/>
				</div>
			</div>
			<hr />
			<div className='section'>
				<div>lol</div>
			</div>
		</>
	);
};

export default Dashboard;
