import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.css';

import Login from './Login';
import Dashboard from './Dashboard';
import SurveyDashboard from './SurveyDashboard';
import AddSurveyQuestion from './AddSurveyQuestion';
import Navbar from './components/Navbar';

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
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
