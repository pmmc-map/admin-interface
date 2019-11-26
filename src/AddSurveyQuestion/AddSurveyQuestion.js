import React from 'react';
import { Link } from 'react-router-dom';

import NewQuestionForm from './NewQuestionForm';

const AddSurveyQuestion = () => {
	return (
		<div className='section'>
			<p>
				<Link to='/dashboard' className='has-text-info'>
					Return to admin dashboard
				</Link>
			</p>
			<h1 className='subtitle is-1'>Add new survey question</h1>
			<hr />
			<div className='columns is-4'>
				<div className='column'>
					<NewQuestionForm />
				</div>
				<div className='column'>
					<p>Question guidelines</p>
					<ul>
						<li>
							Question title should be a maximum of 160 characters
						</li>
						<li>
							Each option should be a maximum of 100 characters
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default AddSurveyQuestion;
