import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getQuestionOptions, updateQuestionText, deleteQuestion } from '../api';
import DeleteQuestion from './DeleteQuestion';

const QuestionEdit = ({ text, onSubmit, hasError }) => {
	const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
	const [newQuestion, setNewQuestion] = useState('');

	useEffect(() => {
		setNewQuestion('');
	}, [text]);

	return (
		<div className='columns'>
			<div className='column is-one-third'>
				<p>New question text:</p>
			</div>
			<div className='column'>
				<div className='field '>
					<div className='control is-fullwidth'>
						<textarea
							className={`textarea${
								hasError ? ' is-danger' : ''
							}`}
							placeholder={text}
							onChange={e =>
								setNewQuestion(e.target.value.trim())
							}
							value={newQuestion}
						/>
					</div>
				</div>
				<div className='field is-narrow'>
					<div className='control is-fullwidth'>
						<button
							className='button is-primary'
							onClick={() => onSubmit(newQuestion)}
						>
							Update question
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

QuestionEdit.propTypes = {
	text: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired,
	hasError: PropTypes.bool.isRequired,
};

const OptionsList = ({ options }) => (
	<div className='columns'>
		<div className='column is-one-third'>
			<p>Question options</p>
		</div>
		<div className='column'>
			<table className='table is-hoverable is-fullwidth'>
				<tbody>
					{options.map(o => (
						<tr key={o.oid}>
							<td key={o.oid}>{o.text}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	</div>
);

OptionsList.propTypes = {
	options: PropTypes.array.isRequired,
};

const QuestionDetail = ({ qid, text }) => {
	const [options, setOptions] = useState([]);
	const [errorText, setErrorText] = useState('');
	const [successText, setSuccessText] = useState('');

	useEffect(() => {
		if (!qid) return;

		const fetchOptions = async () => {
			const optionsResponse = await getQuestionOptions(qid);
			setOptions(optionsResponse);
		};
		fetchOptions();
		setErrorText('');
		setSuccessText('');
	}, [qid]);

	const onSubmitQuestion = async newQuestion => {
		setErrorText('');
		setSuccessText('');

		if (newQuestion.length < 1) {
			setErrorText('Please input your updated question text');
			return;
		}

		if (newQuestion.length > 160) {
			setErrorText(
				'Please keep new question text to a maximum of 160 characters'
			);
			return;
		}

		try {
			const updatedQuestion = await updateQuestionText(qid, newQuestion);
			if (updatedQuestion)
				setSuccessText(
					'Successfully changed question text. Please refresh to see changes.'
				);
			else throw 'cant submit new qustion';
		} catch (err) {
			setErrorText(
				'Coudln&apos;t change question text, please try again later'
			);
			setSuccessText('');
		}
	};

	if (qid === null) {
		return <p>Pick a question to edit</p>;
	}

	const onClickDelete = () => {
		const sendDeleteRequest = async () => {
			const isDeleteSuccessful = await deleteQuestion(qid);
			if (!isDeleteSuccessful) {
				throw 'Cant delete question';
			}
		};
		sendDeleteRequest();
	};

	return (
		<>
			<QuestionEdit
				text={text}
				onSubmit={onSubmitQuestion}
				hasError={!!errorText}
			/>
			<p className='has-text-success'>{successText}</p>
			<p className='has-text-danger'>{errorText}</p>
			<OptionsList options={options} />
			<DeleteQuestion onClickDelete={onClickDelete} questionText={text} />
		</>
	);
};

QuestionDetail.propTypes = {
	qid: PropTypes.number,
	text: PropTypes.string,
};

QuestionDetail.defaultProps = {
	qid: null,
	text: '',
};

export default QuestionDetail;
