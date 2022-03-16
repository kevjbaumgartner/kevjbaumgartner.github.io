// Library imports
import React from 'react';

export default function About() {
	return (
		<div id='About' className='AppContent-Regular'>
			<div id='logo'>
				<img src={require('../assets/profile.jpg')} alt='logo'></img>
			</div>
			<div id='written'>
				<span id='intro'>Nice to meet you!</span>
				<p>
					I'm Kevin, a diligent programmer from Milton, Ontario with an aptitude for creative coding since 2011.
					From individual web pages to full scale implementations, I focus on creating visually captivating, accessible, and interactive applications.
					<br /><br />
					As a developer, my passion to understand and come up with solutions drives me to take on challenges new or old.
					As a person, I'm laid-back, easily enthused, and always looking for the best in every situation. I take time to <a className='focus-link' href='https://twitter.com/shenanigansen/status/764093557497929733' target='_blank' rel='noreferrer'>smell the roses</a>, value positive competition, and strive for continuous improvement.
					<br /><br />
					In my downtime, you can catch me playing games, watching anime, working on personal projects, or diving into my latest hobby (recently Magic: The Gathering).
					If you think we'd get along, feel free to send a message my way, I'm always happy to meet new people!
				</p>
			</div>
			<div id='jots'>
				<div id='skills'>
					<span className='jot-title'>Tech Stack</span>
					<ul className='jot-list'>
						<li>HTML5, CSS3, and JavaScript</li>
						<li>React.js</li>
						<li>MongoDB, and MySQL</li>
						<li>Node.js, and Express.js</li>
					</ul>
				</div>
				<div id='hobbies'>
					<span className='jot-title'>Hobbies</span>
					<ul className='jot-list'>
						<li>Mechanical keyboards</li>
						<li>Tabletop games</li>
						<li>Video games</li>
						<li>Horror movies</li>
					</ul>
				</div>
			</div>
		</div>
	);
};