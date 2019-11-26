import React, { useState } from 'react';

const DataDownloadForm = () => {
	const [email, setEmail] = useState('');
	const [successText, setSuccessText] = useState('');
	const [errorText, setErrorText] = useState('');

	const onSubmitEmail = () => {
		setErrorText('');
		setSuccessText('');
		const emailRe = /[\S]+([@])(\S)+(\.)\S+$/;
		if (email.length < 5 || !emailRe.exec(email)) {
			setErrorText('Please submit a valid email address');
			return;
		}

		setSuccessText('Email sent. Check your inbox in a few minutes');
	};

	return (
		<div className='section'>
			<h1 className='subtitle is-1'>Download all app data</h1>
			<p>
				We will send a .csv file with all of the collected app data to
				your email address.
			</p>
			<div className='field is-grouped'>
				<p className='control'>
					<input
						className='input'
						type='email'
						placeholder='email@email.com'
						onChange={e => setEmail(e.target.value.trim())}
					/>
				</p>
				<p className='control'>
					<button className='button is-info' onClick={onSubmitEmail}>
						Submit
					</button>
				</p>
				{errorText ? (
					<p className='has-text-danger'>{errorText}</p>
				) : null}
				{successText ? (
					<p className='has-text-success'>{successText}</p>
				) : null}
			</div>
		</div>
	);
};

export default DataDownloadForm;
