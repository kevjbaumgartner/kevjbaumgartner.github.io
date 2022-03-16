// Library imports
import React from 'react';

export default function Resume() {
	return (
		<div id='Resume' className='AppContent-Regular'>
			<div id='exp-download'>
				<a href={require('../assets/kevinbaumgartner_resume.pdf')} target='_blank' rel='noreferrer'><i className="fa-solid fa-file-pdf"></i> Download a copy of my resume here!</a>
			</div>
			<span className='exp-header'>Experience</span>
			<div className='exp-block'>
				<div className='exp-item'>
					<span className='exp-item-title'>IT Technician</span>
					<span className='exp-item-date'>Sept. 2021 – Dec. 2021</span>
					<span className='exp-item-employer'>Kinectrics</span>
					<ul className='exp-item-list'>
						<li>Engaged in a hybrid work environment, providing effective technical support for all corporate branches.</li>
						<li>Actively used ticketing systems and remote access software to reduce end-user incident resolution time.</li>
					</ul>
				</div>
				<hr />
				<div className='exp-item'>
					<span className='exp-item-title'>IT Field Services Technician</span>
					<span className='exp-item-date'>Aug. 2020 – Dec. 2020</span>
					<span className='exp-item-employer'>Ontario Ministry of Government and Consumer Services</span>
					<ul className='exp-item-list'>
						<li>Worked remotely to support all Ontario Government ministries, carrying out large scale incident documentation and resolution.</li>
						<li>Quickly adapted to proprietary solutions while applying extensive knowledge of industry level applications to manage configuration item maintenance, software distribution, and rollouts.</li>
					</ul>
				</div>
				<hr />
				<div className='exp-item'>
					<span className='exp-item-title'>IT Infrastructure & Client Services Technician</span>
					<span className='exp-item-date'>Aug. 2017 – Sept. 2018</span>
					<span className='exp-item-employer'>Samuel, Son & Co.</span>
					<ul className='exp-item-list'>
						<li>Provided hybrid technical support to corporate offices and manufacturing plants across North America.</li>
						<li>Used industry standard Windows system management software such as Microsoft system configuration manager, active directory, and sysinternals to increase the efficacy of asset management solutions.</li>
					</ul>
				</div>
				<hr />
				<div className='exp-item'>
					<span className='exp-item-title'>IT Helpdesk Representative</span>
					<span className='exp-item-date'>Jan. 2017 – May 2017</span>
					<span className='exp-item-employer'>Appleby College</span>
					<ul className='exp-item-list'>
						<li>Delivered professional technical support, asset deployment, and training for students and staff of all levels.</li>
						<li>Handled equipment maintenance, setup, and organization by using ticketing solutions.</li>
					</ul>
				</div>
			</div>
			<span className='exp-header'>Education</span>
			<div className='exp-block'>
				<div className='exp-item'>
					<span className='exp-item-title'>Information Systems Security (ISS) Honours Bachelor of Applied Information Sciences </span>
					<span className='exp-item-date'>Class of 2021</span>
					<span className='exp-item-school'>Sheridan College</span>
				</div>
				<hr />
				<div className='exp-item'>
					<span className='exp-item-title'>Software Development and Network Engineering (SDNE) Advanced Diploma</span>
					<span className='exp-item-date'>Class of 2018</span>
					<span className='exp-item-school'>Sheridan College</span>
				</div>
			</div>
		</div>
	);
};