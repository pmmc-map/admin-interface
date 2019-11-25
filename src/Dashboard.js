import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DownloadData = () => {
	const [email, setEmail] = useState('');
	const [successText, setSuccessText] = useState('');
	const [errorText, setErrorText] = useState('');

	const onSubmitEmail = () => {
		setErrorText('');
		setSuccessText('');
		const emailRe = /[\S]+([@])(\S)+(\.)\S+$/;
		if (email.length < 5 || !emailRe.exec(email)) {
			setErrorText('Please submit a valid email address');
			return;
		}

		setSuccessText('Email sent. Check your inbox in a few minutes');
	};

	return (
		<div className='section'>
			<h1 className='subtitle is-1'>Download all app data</h1>
			<p>
				We will send a .csv file with all of the collected app data to
				your email address.
			</p>
			<div className='field is-grouped'>
				<p className='control'>
					<input
						className='input'
						type='email'
						placeholder='email@email.com'
						onChange={e => setEmail(e.target.value.trim())}
					/>
				</p>
				<p className='control'>
					<button
						className='button is-primary'
						onClick={onSubmitEmail}
					>
						Submit
					</button>
				</p>
				{errorText ? (
					<p className='has-text-danger'>{errorText}</p>
				) : null}
				{successText ? (
					<p className='has-text-success'>{successText}</p>
				) : null}
			</div>
		</div>
	);
};

const ModifySurveySection = () => (
	<div className='column'>
		<h4 className='title is-4'>Edit survey questions and responses</h4>
		<div className='field'>
			<p className='control'>
				<Link to='/survey'>
					<button className='button is-primary'>
						Modify or delete questions
					</button>
				</Link>
			</p>
		</div>
		<div className='field'>
			<p className='control'>
				<Link to='/survey/new'>
					<button className='button is-primary'>
						Add new question
					</button>
				</Link>
			</p>
		</div>
	</div>
);

const AddAnimalSection = () => (
	<div className='column'>
		<h4 className='title is-4'>Input new animal rescue information</h4>
		<div className='field is-horizontal'>
			<div className='field-label is-normal'>
				<label className='label'>Name</label>
			</div>
			<div className='field-body'>
				<div className='field is-narrow'>
					<div className='control is-fullwidth'>
						<input
							className='input'
							type='text'
							placeholder='Name'
						/>
					</div>
				</div>
			</div>
		</div>
		<div className='field is-horizontal'>
			<div className='field-label is-normal'>
				<label className='label'>Location</label>
			</div>
			<div className='field-body'>
				<div className='field is-narrow'>
					<div className='control is-fullwidth'>
						<input
							className='input'
							type='text'
							placeholder='Location'
						/>
					</div>
				</div>
			</div>
		</div>
		<div className='field is-horizontal'>
			<div className='field-label is-normal'>
				<label className='label'>Type</label>
			</div>
			<div className='field-body'>
				<div className='field is-narrow'>
					<div className='control is-fullwidth'>
						<input
							className='input'
							type='text'
							placeholder='Type'
						/>
					</div>
				</div>
			</div>
		</div>
		<div className='field is-horizontal'>
			<div className='field-label is-normal'>
				<label className='label'>Notes</label>
			</div>
			<div className='field-body'>
				<div className='field is-narrow'>
					<div className='control is-fullwidth'>
						<textarea className='textarea' placeholder='Type' />
					</div>
				</div>
			</div>
		</div>
		<div className='field is-horizontal'>
			<div className='field-label is-normal'></div>
			<div className='field-body'>
				<div className='field is-narrow'>
					<div className='control is-fullwidth'>
						<button className='button is-primary'>Submit</button>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const UpdateRescueNumberSection = ({ numRescues }) => (
	<div className='column'>
		<h4 className='title is-4'>Update total number of animals rescued</h4>
		<p>Current number of rescues: {numRescues}</p>
		<div className='field is-horizontal'>
			<div className='field-label is-fullwidth'>
				<label className='label'>New number</label>
			</div>
			<div className='field-body'>
				<div className='field'>
					<div className='control'>
						<input type='number' placeholder={numRescues + 1} />
					</div>
				</div>
			</div>
		</div>
	</div>
);

UpdateRescueNumberSection.propTypes = {
	numRescues: PropTypes.number.isRequired,
};

const Dashboard = () => {
	return (
		<>
			<DownloadData />
			<hr />
			<div className='section'>
				<h1 className='subtitle is-1'>Modify app interface</h1>
				<div className='columns'>
					<ModifySurveySection />
					<AddAnimalSection />
					<UpdateRescueNumberSection numRescues={39} />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
