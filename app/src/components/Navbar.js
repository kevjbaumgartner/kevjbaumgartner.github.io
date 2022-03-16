// Library imports
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
	return (
		<div id='Navbar'>
			<div id='links-local'>
				<NavLink to={'/'} className={(state) => (state.isActive ? "focus" : 'none')}>Home</NavLink>
				<NavLink to={'/about'} className={(state) => (state.isActive ? "focus" : 'none')}>About</NavLink>
				<NavLink to={'/projects'} className={(state) => (state.isActive ? "focus" : 'none')}>Projects</NavLink>
				<NavLink to={'/resume'} className={(state) => (state.isActive ? "focus" : 'none')}>Resume</NavLink>
			</div>
		</div >
	);
};