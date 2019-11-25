import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ModalDeleteOptions = ({
	dismissModal,
	onClickDelete,
	questionText,
	isQuestionDeleted,
	isDeleteSuccessful,
}) => (
	<>
		<header className='modal-card-head'>
			<p className='modal-card-title'></p>
			<button
				className='delete'
				aria-label='close'
				onClick={e => dismissModal(e)}
			></button>
		</header>
		<section
			className='modal-card-body'
			style={{
				textAlign: 'center',
				padding: '1rem 2rem',
			}}
		>
			{isQuestionDeleted ? (
				<p>Question deleted. Refresh page to see changes.</p>
			) : (
				<>
					<p>Are you sure you want to delete this question?</p>

					<h4 className='subtitle is-4'>
						&quot;{questionText}&quot;
					</h4>
					{!isDeleteSuccessful ? (
						<p className='has-text-danger'>
							Couldn&apos;t delete question. Please refresh page
							and try again later.
						</p>
					) : null}
				</>
			)}
		</section>
		{isQuestionDeleted ? null : (
			<footer
				className='modal-card-foot'
				style={{
					justifyContent: 'space-evenly',
				}}
			>
				<button
					className='button is-medium'
					onClick={e => dismissModal(e)}
				>
					Cancel
				</button>
				<button
					className='button is-danger is-medium'
					onClick={e => {
						onClickDelete();
						e.preventDefault();
					}}
				>
					Delete
				</button>
			</footer>
		)}
	</>
);

ModalDeleteOptions.propTypes = {
	dismissModal: PropTypes.func.isRequired,
	onClickDelete: PropTypes.func.isRequired,
	questionText: PropTypes.string.isRequired,
	isQuestionDeleted: PropTypes.bool.isRequired,
	isDeleteSuccessful: PropTypes.bool.isRequired,
};

const DeleteQuestion = ({ onClickDelete, questionText }) => {
	const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);
	const [isQuestionDeleted, setIsQuestionDeleted] = useState(false);
	const [isDeleteSuccessful, setIsDeleteSuccessful] = useState(true);

	useEffect(() => {
		setIsDeleteModalShowing(false);
		setIsQuestionDeleted(false);
		setIsDeleteSuccessful(true);
	}, [questionText]);

	const hideModalFromModal = e => {
		setIsDeleteModalShowing(false);
		e.preventDefault();
	};

	return (
		<>
			<button
				className='button is-danger'
				onClick={() => setIsDeleteModalShowing(true)}
			>
				Delete question
			</button>
			<div className={`modal${isDeleteModalShowing ? ' is-active' : ''}`}>
				<div
					className='modal-background'
					onClick={e => hideModalFromModal(e)}
				></div>
				<div className='modal-content'>
					<div className='modal-card'>
						<ModalDeleteOptions
							onClickDelete={() => {
								try {
									onClickDelete();
									setIsQuestionDeleted(true);
								} catch (err) {
									setIsDeleteSuccessful(false);
								}
							}}
							dismissModal={hideModalFromModal}
							questionText={questionText}
							isQuestionDeleted={isQuestionDeleted}
							isDeleteSuccessful={isDeleteSuccessful}
						/>
					</div>
				</div>
				<button
					className='modal-close is-large'
					aria-label='close'
					onClick={e => hideModalFromModal(e)}
				>
					CLOSE
				</button>
			</div>
		</>
	);
};

DeleteQuestion.propTypes = {
	onClickDelete: PropTypes.func.isRequired,
	questionText: PropTypes.string.isRequired,
};

export default DeleteQuestion;
