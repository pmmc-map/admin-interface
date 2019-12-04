import React, { useState, useEffect } from 'react';

import { updateNumRescues, getRescueCounts } from '../api';

const UpdateRescueNumberForm = () => {
	const [numRescues, setNumRescues] = useState(0);
	const [newNumber, setNewNumber] = useState(null);
	const [errMessage, setErrMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {
		const getCurCount = async () => {
			try {
				const rescuesResponse = await getRescueCounts();
				const counts = await rescuesResponse.counts;
				if (!rescuesResponse || !counts)
					throw 'cant get number of rescues';
				const rescueCounts = counts.filter(
					count => count.name === 'num_rescues'
				);
				setNumRescues(rescueCounts[0].total);
			} catch (err) {
				setNumRescues(0);
			}
		};
		getCurCount();
	}, []);

	const onSubmit = () => {
		setErrMessage('');
		setSuccessMessage('');

		const sendNewCount = async () => {
			const countsResponse = await updateNumRescues(newNumber);
			if (!countsResponse) throw 'Cant update number of rescues';
			setSuccessMessage('Successfully updated number of rescues');
			setNumRescues(newNumber);
		};

		try {
			if (!newNumber || !Number(newNumber)) {
				throw 'Cant update number of rescues';
			}
			sendNewCount();
		} catch (err) {
			setErrMessage('Please enter a valid number');
		}
	};

	return (
		<div className='column'>
			<h4 className='title is-4'>
				Update total number of animals rescued
			</h4>
			<p>Current number of rescues: {numRescues}</p>
			<div className='field is-horizontal'>
				<div className='field-label is-fullwidth'>
					<label className='label'>New number</label>
				</div>
				<div className='field-body'>
					<div className='field'>
						<div className='control'>
							<input
								className={`input${
									errMessage ? ' is-danger' : ''
								}`}
								type='number'
								placeholder={numRescues + 1}
								onChange={e => setNewNumber(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='field is-horizontal'>
				<div className='field-label is-normal'></div>
				<div className='field-body'>
					<div className='field is-narrow'>
						<div className='control is-fullwidth'>
							<button
								className='button is-info'
								onClick={onSubmit}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
			<p className='has-text-danger'>{errMessage}</p>
			<p className='has-text-success'>{successMessage}</p>
		</div>
	);
};

export default UpdateRescueNumberForm;
