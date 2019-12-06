import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
		setQuestions(questions =>
			questions.map(q => {
				if (q.qid === qid) q.isSelected = true;
				else q.isSelected = false;
				return q;
			})
		);
	};

	return (
		<div className='section'>
			<p>
				<Link to='/dashboard' className='has-text-info'>
					Return to admin dashboard
				</Link>
			</p>
			<h1 className='subtitle is-1'>
				Modify or delete existing survey questions
			</h1>
			<p>Select a question below to edit</p>
			<hr />
			<div className='columns is-4'>
				<div className='column'>
					<QuestionSidebar
						questions={questions}
						onClick={onClickQuestion}
					/>
					<Link to='/survey/new'>
						<button className='button is-success is-link'>
							Add a new question
						</button>
					</Link>
				</div>
				<div className='column'>
					<QuestionDetail {...selectedQuestion} />
				</div>
			</div>
		</div>
	);
};

export default SurveyDashboard;
