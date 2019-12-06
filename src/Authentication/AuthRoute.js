import React, { useState } from 'react';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';
import AuthPage from './AuthPage';

const AuthRoute = ({component: Component, ...other}) => {
	return (
		<Route
			render={
				(routeProps)=>{
					if(sessionStorage.getItem('PMMCAdminLogin')){
						return (<AuthPage RenderComponent={Component} {...routeProps}/>);
					}
					else {
						return(<Redirect to={'/login' + '?a=' + routeProps.match.path}/>);
					}
				}
			}
			{...other}
		/>
	);
};

AuthRoute.propTypes = {
	component: PropTypes.any.isRequired
};

export default AuthRoute;
