import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import {authorized} from '../api';


/**
 * AuthPage
 * wrapper around any page where the user needs to be authenticated to view
 *
 */
const AuthPage = ({RenderComponent: RenderComponent, ...other}) => {

	const [loggedin, setLoggedin] = useState(false);
	const [authenticating, setAuthenticating] = useState(true);
	const init = ()=>{
		authorized(sessionStorage.getItem('PMMCAdminToken')).then((result)=>{
			if(!result['error_description']){ //&& result['email'] === 'pmmc@gmail.com'){
				setLoggedin(true);
			}
			setAuthenticating(false);
		});
	};

	useEffect(init, []);

	if(authenticating){
		return null;
	}
	else if(loggedin){
		return (<RenderComponent {...other}/>);
	}

	return (<Redirect to={'/login'}/>);

};

AuthPage.propTypes = {
	RenderComponent: PropTypes.any.isRequired
};

export default AuthPage;
