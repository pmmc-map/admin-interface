import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import {googleLogin} from '../api';


/**
 * AuthPage
 * wrapper around any page where the user needs to be authenticated to view
 *
 */
const AuthPage = ({RenderComponent: RenderComponent, ...other}) => {

	const [loggedin, setLoggedin] = useState(false);
	const [authenticating, setAuthenticating] = useState(true);
	const init = ()=>{
		googleLogin(JSON.parse(sessionStorage.getItem('PMMCAdminLogin'))).then((result)=>{
			console.log('auth result:', result);
			if(result.error){
				console.log('error');
			}
			else if(result.authorized){
				setLoggedin(true);
				return null;
			}

			alert('Sorry, you are not authorized to login.');
		}).finally(()=>{
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

	return (<Redirect to={'/login' + '?a=' + other.match.path}/>);

};

AuthPage.propTypes = {
	RenderComponent: PropTypes.any.isRequired
};

export default AuthPage;
