import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.css';

import Login from './Login';
import Dashboard from './Dashboard';
import SurveyDashboard from './SurveyDashboard';
import AddSurveyQuestion from './AddSurveyQuestion';
import Navbar from './components/Navbar';
import AuthRoute from './AuthRoute';

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route path='/login' component={Login} />
				<AuthRoute path='/dashboard' component={Dashboard} />
				<AuthRoute exact path='/survey' component={SurveyDashboard} />
				<AuthRoute path='/survey/new' component={AddSurveyQuestion} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
