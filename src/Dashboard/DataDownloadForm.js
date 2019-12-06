import React, { useState } from 'react';
import { sendEmail } from '../api';

const DataDownloadForm = () => {
	const [email, setEmail] = useState('');
	const [successText, setSuccessText] = useState('');
	const [errorText, setErrorText] = useState('');

	const onSubmitEmail = () => {
		setErrorText('');
		setSuccessText('');
		const emailRe = /[\S]+([@])(\S)+(\.)\S+$/;
		const makeEmailRequest = async () => {
			const emailResponse = sendEmail(email);
			if (!emailResponse) throw 'Cant send email';
		};
		try {
			if (email.length < 5 || !emailRe.exec(email)) {
				throw 'invalid email error';
			}
			makeEmailRequest();
			setSuccessText('Email sent. Check your inbox in a few minutes');
		} catch (err) {
			setErrorText('Please submit a valid email address');
		}
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
						className={`input${errorText ? ' is-danger' : ''}`}
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
