import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Login = props => {
	const { history } = props;
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [isLoginSuccessful, setIsloginSuccessful] = useState(true);

	const onClickLogin = () => {
		// make authentication request to backend
		console.log(history);
		history.push('/dashboard');
	};

	return (
		<div className='section'>
			<div className='container'>
				<div className='field'>
					<label className='label'>Password</label>
					<p className='control'>
						<input
							className='input'
							type='password'
							placeholder='Password'
						/>
					</p>
				</div>
				<div className='field'>
					<p className='control'>
						<button
							onClick={onClickLogin}
							className='button is-success'
						>
							Login
						</button>
					</p>
				</div>
			</div>
		</div>
	);
};

Login.propTypes = {
	history: PropTypes.object.isRequired,
};

export default Login;
