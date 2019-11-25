import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Option = ({ qid, text, onClick, isSelected }) => (
	<a
		className={'panel-block' + (isSelected ? ' is-active' : '')}
		onClick={() => onClick(qid)}
	>
		<span className='panel-icon'>
			<i className='fas fa-book' aria-hidden='true'>
				{' '}
			</i>
		</span>
		{text}
	</a>
);

Option.propTypes = {
	qid: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	isSelected: PropTypes.bool,
};

Option.defaultProps = {
	isSelected: false,
};

const QuestionSidebar = ({ questions, onClick }) => {
	return (
		<article className='panel is-primary'>
			{questions.map(q => (
				<Option key={q.qid} {...q} onClick={onClick} />
			))}
		</article>
	);
};

QuestionSidebar.propTypes = {
	questions: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default QuestionSidebar;
