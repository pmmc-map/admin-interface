import React, { useState } from 'react';

import DataDownloadForm from './DataDownloadForm';
import AddAnimalForm from './AddAnimalForm';
import UpdateRescueNumberForm from './UpdateRescueNumberForm';
import ModifySurveyLinks from './ModifySurveyLinks';

const Dashboard = () => {
	return (
		<>
			<DataDownloadForm />
			<hr />
			<div className='section'>
				<h1 className='subtitle is-1'>Modify app interface</h1>
				<div className='columns'>
					<ModifySurveyLinks />
					<AddAnimalForm />
					<UpdateRescueNumberForm numRescues={39} />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
