import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { addNewRescue } from '../api';

const AnimalInput = ({ fieldName, onChange, hasError }) => (
	<div className='field'>
		<label className='label'>{fieldName}</label>
		<div className='control is-fullwidth'>
			<input
				className={`input${hasError ? ' is-danger' : ''}`}
				type='text'
				placeholder={fieldName}
				onChange={e => onChange(fieldName, e.target.value)}
			/>
		</div>
	</div>
);

AnimalInput.propTypes = {
	fieldName: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	hasError: PropTypes.bool.isRequired,
};

const AddAnimalForm = () => {
	const [infoValues, setInfoValues] = useState(
		[
			'Animal Name',
			'Full location address',
			'Location name (for display)',
			'Placement year',
			'Animal Species',
			'Notes (for display)',
		].map(v => ({
			fieldName: v,
			err: false,
			val: '',
		}))
	);
	const [successMessage, setSuccessMessage] = useState('');
	const [errMessage, setErrMessage] = useState('');

	const onInputChange = (inputName, newValue) => {
		setInfoValues(infoValues =>
			infoValues.map(v => {
				if (v.fieldName === inputName) {
					v.val = newValue;
					v.err = false;
				}
				return v;
			})
		);
	};

	const onSubmit = e => {
		e.preventDefault();

		setErrMessage('');
		setSuccessMessage('');

		const d = new Date();

		try {
			const newInfoValues = infoValues.map(field => {
				if (field.fieldName === 'Notes') return field;

				if (
					field.fieldName === 'Placement year' &&
					(!Number(field.val) ||
						field.val.length !== 4 ||
						Number(field.val) > d.getFullYear())
				)
					throw 'Please make sure Placement year is a valid year';

				if (!field || field.val.length < 1)
					throw 'Please fill in required fields';

				return field;
			});
			setInfoValues(newInfoValues);
		} catch (err) {
			setErrMessage(err);
			return;
		}

		const recordNewAnimal = async () => {
			try {
				// this is so bad
				const successResponse = await addNewRescue(
					infoValues[0].val,
					infoValues[1].val,
					infoValues[2].val,
					Number(infoValues[3].val),
					infoValues[4].val[0].toUpperCase() +
						infoValues[4].val.substring(
							1,
							infoValues[4].val.length
						),
					infoValues[5].val
				);
				if (successResponse)
					setSuccessMessage(
						'Successfully added new resuce information!'
					);
				else throw 'error';
			} catch (err) {
				setErrMessage(
					'Couldnt add new rescue information, please try again later.'
				);
			}
		};

		recordNewAnimal();
	};

	return (
		<div className='column'>
			<h4 className='title is-4'>Input new animal rescue information</h4>
			<form onSubmit={onSubmit}>
				{infoValues.map(field => (
					<AnimalInput
						onChange={onInputChange}
						fieldName={field.fieldName}
						hasError={field.err}
						key={field.fieldName}
					/>
				))}
				<div className='field is-horizontal'>
					<div className='control is-fullwidth'>
						<button
							className='button is-info'
							type='submit'
							onClick={onSubmit}
						>
							Submit
						</button>
					</div>
				</div>
				<p className='has-text-danger'>{errMessage}</p>
				<p className='has-text-success'>{successMessage}</p>
			</form>
		</div>
	);
};

export default AddAnimalForm;
