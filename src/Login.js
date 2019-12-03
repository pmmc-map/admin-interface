import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';

import { GOOGLE_LOGIN_CLIENT_ID } from './constants';
import { googleLogin } from './api';

const Login = props => {
	const { history } = props;
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [isLoginSuccessful, setIsloginSuccessful] = useState(true);

	const onClickLogin = async resp => {
		// make authentication request to backend
		sessionStorage.setItem('PMMCAdminToken', resp['Zi']['id_token']);
		const googleResponse = await googleLogin(resp);
		console.log(googleResponse);
		// history.push('/dashboard');
	};

	return (
		<section className='hero is-info is-fullheight-with-navbar'>
			<div className='hero-body'>
				<div
					className='container'
					style={{
						justifyContent: 'center',
						display: 'flex',
					}}
				>
					<GoogleLogin
						clientId={GOOGLE_LOGIN_CLIENT_ID}
						buttonText='Login'
						onSuccess={onClickLogin}
						cookiePolicy='single_host_origin'
					/>
				</div>
			</div>
		</section>
	);

	// return (
	// <div className='section'>
	// <div className='container'>
	// <div className='field'>
	// <label className='label'>Password</label>
	// <p className='control'>
	// <input
	// className='input'
	// type='password'
	// placeholder='Password'
	// />
	// </p>
	// </div>
	// <div className='field'>
	// <p className='control'>
	// <button
	// onClick={onClickLogin}
	// className='button is-success'
	// >
	// Login
	// </button>
	// </p>
	// </div>
	// </div>
	// </div>
	// );
};

Login.propTypes = {
	history: PropTypes.object.isRequired,
};

export default Login;
