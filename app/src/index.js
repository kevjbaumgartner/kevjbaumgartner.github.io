// Library imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// App import
import App from './App';

// CSS import
import './style/global.css';
import './style/navbar.css'
import './style/landing.css';
import './style/about.css';
import './style/projects.css';
import './style/resume.css';
import './style/footer.css';

// CSS media queries
import './style/media.css';

// CSS animations import
import './style/animations.css';

// Font Awesome 6 import
import './fonts/fontawesome-free-6.0.0-web/css/all.min.css';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);