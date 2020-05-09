/** @format */

import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../shared/context/auth-context';
import Button from '../FormElements/Button';

const NavLinks = () => {
	const auth = useContext(AuthContext);
	return (
		<ul className='nav-links'>
			<li>
				<NavLink to='/' exact>
					ALL USERS
				</NavLink>
			</li>
			{auth.isLoggedIn && (
				<li>
					<NavLink to={`/${auth.userId}/places`}> MY PLACES</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<NavLink to='/places/new'>ADD PLACES </NavLink>
				</li>
			)}
			{!auth.isLoggedIn ? (
				<li>
					<NavLink to='/auth'>AUTHENTICATE</NavLink>
				</li>
			) : (
				<li>
					<Button onClick={auth.logout}>LOGOUT</Button>
				</li>
			)}
		</ul>
	);
};
export default NavLinks;
