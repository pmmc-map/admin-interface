import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';

import { GOOGLE_LOGIN_CLIENT_ID } from './constants';
import { useLocation, Redirect } from 'react-router-dom';
import { googleLogin } from './api';

const Login = props => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const onClickLogin = async resp => {
		// make authentication request to backend
		sessionStorage.setItem('PMMCAdminLogin', JSON.stringify(resp));
		setIsLoggedIn(true);
	};

	function useQuery() {
		return new URLSearchParams(useLocation().search);
	}

	let query = useQuery();

	if (isLoggedIn) {
		return <Redirect to={query.get('a') ? query.get('a') : '/dashboard'} />;
	}

	return (
		<span
			className='hero is-info is-fullheight-with-navbar'
			style={{
				textAlign: 'center',
			}}
		>
			<div className='hero-body'>
				<div className='container'>
					<div className='box' style={{ margin: '0 25%' }}>
						<h1 className='title is-1 has-text-info'>Login</h1>
						<p>
							Use your authorized Google account to login to the
							admin dashboard
						</p>
						<div
							className='field'
							style={{
								display: 'flex',
								justifyContent: 'center',
								margin: '2rem 0',
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
				</div>
			</div>
		</span>
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
