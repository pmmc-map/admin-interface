import React, { useState } from 'react';
import { Redirect, Route } from 'react-router';


let i = 0;
const AuthRoute = ({component: Component, ...other}) => {
	function checkAuthenticated() {
		// check if the correct user is logged in
		console.log(document.cookie);
	}

	return (
		<Route
			render={
				(routeProps)=>{
					if(checkAuthenticated()){
						return (<Component {...routeProps}/>);
					}
					else {
						return(<Redirect to={'/login'}/>);
					}
				}
			}
			{...other}
		/>
	);
};

export default AuthRoute;
