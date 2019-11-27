import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UpdateRescueNumberForm = ({ numRescues }) => {
	const [newNumber, setNewNumber] = useState(null);
	const [errMessage, setErrMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const onSubmit = () => {
		setErrMessage('');
		setSuccessMessage('');

		if (!newNumber || !Number(newNumber)) {
			setErrMessage('Please enter a valid number');
			return;
		}

		setSuccessMessage('Successfully updated number of rescues');
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

UpdateRescueNumberForm.propTypes = {
	numRescues: PropTypes.number.isRequired,
};

export default UpdateRescueNumberForm;
