import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getQuestionOptions } from '../api';

const QuestionEdit = ({ text, onSubmit }) => {
	const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

	return (
		<div className='columns'>
			<div className='column'>
				<p>New question text:</p>
			</div>
			<div className='column'>
				<div className='field '>
					<div className='control is-fullwidth'>
						<textarea className='textarea' placeholder={text} />
					</div>
				</div>
				<div className='field is-narrow'>
					<div className='control is-fullwidth'>
						<button className='button is-primary'>
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
};

const OptionsList = ({ options }) => (
	<div className='columns'>
		<div className='column'>
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

	useEffect(() => {
		if (!qid) return;

		const fetchOptions = async () => {
			const optionsResponse = await getQuestionOptions(qid);
			setOptions(optionsResponse);
		};
		fetchOptions();
	}, [qid]);

	if (qid === null) {
		return <p>Pick a question</p>;
	}

	return (
		<>
			<QuestionEdit text={text} onSubmit={() => console.log('text')} />
			<OptionsList options={options} />
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
