import React, { useState } from 'react';

const AddAnimalForm = () => (
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
						<button className='button is-info'>Submit</button>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default AddAnimalForm;
