import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { addNewQuestion, addNewOption } from '../api';

const MAX_QUESTION_LENGTH = 160;
const MAX_OPTION_LENGTH = 100;

const NewOption = ({ oid, onChange }) => (
	<div className='field is-horizontal'>
		<div className='field-label is-normal'>
			<label className='label'>{'Option ' + oid}</label>
		</div>
		<div className='field-body'>
			<div className='field'>
				<div className='control is-fullwidth'>
					<input
						onChange={e => onChange(oid, e.target.value.trim())}
						className='input'
						type='text'
						placeholder={'Option ' + oid}
						maxLength={MAX_OPTION_LENGTH}
						minLength={1}
						required={oid < 3}
						name={'Option ' + oid}
					/>
				</div>
			</div>
		</div>
	</div>
);

NewOption.propTypes = {
	oid: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
};

const NewQuestionForm = () => {
	const [newQuestionText, setNewQuestionText] = useState('');
	const [optionsText, setOptionsText] = useState(Array(4));
	const [errorText, setErrorText] = useState('');
	const [successText, setSuccessText] = useState('');

	const onSubmit = () => {
		setErrorText('');
		setSuccessText('');

		if (newQuestionText.length < 1) {
			setErrorText('Please input a question in the question field');
			return;
		}

		if (newQuestionText.length > MAX_QUESTION_LENGTH) {
			setErrorText(
				'Please keep question text to a maximum of 160 characters'
			);
			return;
		}

		if (
			!optionsText[0] ||
			!optionsText[1] ||
			optionsText[0].length < 1 ||
			optionsText[1].length < 1
		) {
			setErrorText(
				'Please add at least 2 responses to your new question.'
			);
			return;
		}

		optionsText.map(o => {
			if (o && o.length > MAX_OPTION_LENGTH)
				setErrorText(
					'Please keep each option to a maximum of 100 characters'
				);
		});

		if (errorText) return;

		if (optionsText[3] && !optionsText[2]) {
			setErrorText(
				'Please move your response for option 4 into the option 3 box'
			);
			return;
		}

		const sendNewQuestion = async () => {
			try {
				const qid = await addNewQuestion(newQuestionText);
				let o = optionsText[0];
				for (o of optionsText) {
					if (o) {
						const optionResponse = await addNewOption(qid, o);
						if (!optionResponse) throw 'Cant add option';
					}
				}
				setSuccessText(
					'Successfully added new survey question and options to database'
				);
			} catch (err) {
				console.log(err);
				setErrorText(
					'Could not add new question to database, please try again later'
				);
			}
		};

		sendNewQuestion();
	};

	const updateOptionsText = (oid, newText) => {
		setOptionsText(options => {
			options[oid - 1] = newText;
			return options;
		});
	};

	return (
		<>
			<div key={'Question'} className='field is-horizontal'>
				<div className='field-label is-normal'>
					<label className='label'>Question</label>
				</div>
				<div className='field-body'>
					<div className='field'>
						<div className='control is-fullwidth'>
							<textarea
								onChange={e =>
									setNewQuestionText(e.target.value.trim())
								}
								className='textarea'
								placeholder='Question'
								required
								maxLength={MAX_QUESTION_LENGTH}
								minLength={1}
							/>
						</div>
					</div>
				</div>
			</div>
			<>
				{[1, 2, 3, 4].map(oid => (
					<NewOption
						key={oid}
						oid={oid}
						onChange={updateOptionsText}
					/>
				))}
			</>
			<div key='button' className='field is-horizontal'>
				<div className='field-label is-normal'></div>
				<div className='field-body'>
					<div className='field is-narrow'>
						<div className='control is-fullwidth'>
							<button
								className='button is-primary'
								onClick={onSubmit}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
			<p className='has-text-danger'>{errorText}</p>
			<p className='has-text-success'>{successText}</p>
		</>
	);
};

export default NewQuestionForm;
