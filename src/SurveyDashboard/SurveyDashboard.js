import React, { useEffect, useState } from 'react';
import { getAllQuestions } from '../api';
import QuestionSidebar from './QuestionSidebar';
import QuestionDetail from './QuestionDetail';

const SurveyDashboard = () => {
	const [selectedQuestion, setSelectedQuestion] = useState(null);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		const fetchQuestions = async () => {
			const questionsResponse = await getAllQuestions();
			setQuestions(questionsResponse);
		};

		fetchQuestions();
	}, []);

	const onClickQuestion = qid => {
		setSelectedQuestion(questions.filter(q => q.qid === qid)[0]);
		setQuestions(q => {
			if (q.qid === qid) q.isSelected = true;
			return q;
		});
	};

	return (
		<div className='section'>
			<h1 className='subtitle is-1'>
				Modify or delete existing survey questions
			</h1>
			<p>Select a question below to edit</p>
			<hr />
			<div className='columns'>
				<div className='column'>
					<QuestionSidebar
						questions={questions}
						onClick={onClickQuestion}
					/>
				</div>
				<div className='column'>
					<QuestionDetail {...selectedQuestion} />
				</div>
			</div>
		</div>
	);
};

export default SurveyDashboard;