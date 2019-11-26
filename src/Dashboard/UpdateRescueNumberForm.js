import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UpdateRescueNumberForm = ({ numRescues }) => (
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

UpdateRescueNumberForm.propTypes = {
	numRescues: PropTypes.number.isRequired,
};

export default UpdateRescueNumberForm;
