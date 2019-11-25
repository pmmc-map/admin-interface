import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.css';

import Login from './Login';
import Dashboard from './Dashboard';
import SurveyDashboard from './SurveyDashboard';
import AddSurveyQuestion from './AddSurveyQuestion';

const App = () => {
	return (
		<BrowserRouter>
			<header className='hero is-primary'>
				<div className='hero-body'>
					<div className='container'>
						<Link to='/dashboard'>
							<h1 className='title'>Map App Admin</h1>
						</Link>
					</div>
				</div>
			</header>
			<Switch>
				<Route path='/login' component={Login} />
				<Route path='/dashboard' component={Dashboard} />
				<Route exact path='/survey' component={SurveyDashboard} />
				<Route path='/survey/new' component={AddSurveyQuestion} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
