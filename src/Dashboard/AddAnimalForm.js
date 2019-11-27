import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { addNewRescue } from '../api';

const AnimalInput = ({ fieldName, onChange, hasError }) => (
	<div className='field is-horizontal'>
		<div className='field-label is-normal'>
			<label className='label'>{fieldName}</label>
		</div>
		<div className='field-body'>
			<div className='field is-narrow'>
				<div className='control is-fullwidth'>
					<input
						className={`input${hasError ? ' is-danger' : ''}`}
						type='text'
						placeholder={fieldName}
						onChange={e => onChange(fieldName, e.target.value)}
					/>
				</div>
			</div>
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
		['Name', 'Location', 'Placement year', 'Type', 'Notes'].map(v => ({
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

	const onSubmit = () => {
		setErrMessage('');
		setSuccessMessage('');

		const newInfoValues = infoValues.map(field => {
			if (!field || field.val.length < 1) {
				setErrMessage('Please fill in required fields');
				field.err = true;
			}
			return field;
		});
		setInfoValues(newInfoValues);
		if (errMessage) return;

		const recordNewAnimal = async () => {
			try {
				// this is so bad
				const successResponse = await addNewRescue(
					infoValues[0].val,
					infoValues[1].val,
					infoValues[2].val,
					infoValues[3].val,
					infoValues[4].val
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
			{infoValues.map(field => (
				<AnimalInput
					onChange={onInputChange}
					fieldName={field.fieldName}
					hasError={field.err}
					key={field.fieldName}
				/>
			))}
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

export default AddAnimalForm;
