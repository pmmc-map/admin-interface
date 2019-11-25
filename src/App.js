import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.css';

import Login from './Login';
import Dashboard from './Dashboard';
import SurveyDashboard from './SurveyDashboard';
import AddSurveyQuestion from './AddSurveyQuestion';

const App = () => {
	return (
		<>
			<header className='hero is-primary'>
				<div className='hero-body'>
					<div className='container'>
						<h1 className='title'>Map App Admin</h1>
					</div>
				</div>
			</header>
			<BrowserRouter>
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/dashboard' component={Dashboard} />
					<Route exact path='/survey' component={SurveyDashboard} />
					<Route path='/survey/new' component={AddSurveyQuestion} />
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default App;
