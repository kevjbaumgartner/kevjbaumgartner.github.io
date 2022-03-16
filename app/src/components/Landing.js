// Library imports
import React from 'react';

export default function Landing() {
	return (
		<div id='Landing' className='AppContent-Center'>
			<div id='logo'>
				<img src={require('../assets/profile.jpg')} alt='logo'></img>
			</div>
			<div id='menu'>
				<div className='text'>
					Hi! I'm <span className='focus'>Kevin Baumgartner</span>,
					<br />
					a full stack developer.
					<br /><br />
					I specialize in web development, using the <a href='https://www.mongodb.com/mern-stack' target='_blank' rel='noreferrer' className='focus-link'>MERN solution stack</a> to create beautiful solutions for everyday ideas.
				</div>
			</div>
		</div>
	);
};