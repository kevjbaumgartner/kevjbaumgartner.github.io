// Library imports
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

// Component imports
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import About from './components/About';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

// App
const App = () => {
	let location = useLocation();
	return (
		<div id='App'>
			<Navbar />
			<SwitchTransition id='AppContent'>
				<CSSTransition key={location.pathname} classNames="fade" timeout={200}>
					<Routes location={location}>
						<Route exact path='/' element={<Landing />} />		{/* Default - Home screen */}
						<Route path='/about' element={<About />} />			{/* About me */}
						<Route path='/projects' element={<Projects />} />	{/* My projects */}
						<Route path='/resume' element={<Resume />} />		{/* My experience */}
						<Route path='*' element={<NotFound />} />			{/* Route fall through */}
					</Routes>
				</CSSTransition>
			</SwitchTransition>
			<Footer />
		</div>
	);
};

export default App;