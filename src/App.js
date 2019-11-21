import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.css';

import Login from './Login';
import Dashboard from './Dashboard';

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
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default App;
