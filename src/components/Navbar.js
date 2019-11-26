import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [isMenuShowing, setIsMenuShowing] = useState(true);
	return (
		<nav
			className='navbar is-info'
			role='navigation'
			aria-label='main navigation'
		>
			<div className='navbar-brand'>
				<Link className='navbar-item' to='/dashboard'>
					<img src='https://images.squarespace-cdn.com/content/5bb6555ef8135a760bccc650/1538676674561-8APC1JXRMTY518LJL2MO/logo.png?content-type=image%2Fpng' />
					<h1 className='title is-1 has-text-white'>
						PMMC Map App Admin
					</h1>
				</Link>

				<a
					role='button'
					className={`navbar-burger burger${
						isMenuShowing ? ' is-active' : ''
					}`}
					aria-label='menu'
					aria-expanded='false'
					data-target='navbarBasicExample'
					onClick={() =>
						setIsMenuShowing(isMenuShowing => !isMenuShowing)
					}
				>
					<span aria-hidden='true'></span>
					<span aria-hidden='true'></span>
					<span aria-hidden='true'></span>
				</a>
				<div
					id='navbarBasicExample'
					className={`navbar-menu${
						isMenuShowing ? ' is-active' : ''
					}`}
				>
					<div className='navbar-start'>
						<Link className='navbar-item' to='/dashboard'>
							Home
						</Link>

						<Link className='navbar-item' to='/survey'>
							Edit survey questions
						</Link>
						<Link className='navbar-item' to='/survey/new'>
							New survey question
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
