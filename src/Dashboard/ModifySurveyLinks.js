import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ModifySurveyLinks = () => (
	<div className='column'>
		<h4 className='title is-4'>Edit survey questions and responses</h4>
		<div className='field'>
			<p className='control'>
				<Link to='/survey'>
					<button className='button is-info'>
						Modify or delete questions
					</button>
				</Link>
			</p>
		</div>
		<div className='field'>
			<p className='control'>
				<Link to='/survey/new'>
					<button className='button is-info'>Add new question</button>
				</Link>
			</p>
		</div>
	</div>
);

export default ModifySurveyLinks;
