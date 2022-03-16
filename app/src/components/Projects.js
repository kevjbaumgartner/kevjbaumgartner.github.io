// Library imports
import React from 'react';

export default function Projects() {
	return (
		<div id='Projects' className='AppContent-Regular'>
			{/* <div id='projects-callout'>
				<a href='https://github.com/kevjbaumgartner/' target='_blank' rel='noreferrer'><i className="fa-brands fa-github"></i> See all of my repositories here!</a>
			</div> */}
			<div id='tiles'>
				<div className='tile'>
					<img className='tile-img' src={require('../assets/tile-portfolio.jpg')} alt=''></img>
					<div className='tile-content'>
						<span className='tile-title'>Portfolio</span>
						<p className='tile-text'>
							My personal portfolio website. Made with React, it uses framework proprietary extensions
							such as the React router and transition group to streamline interactive development.
						</p>
						<div className='tile-footer'>
							<ul className='tile-stack'>
								<li><i className="fa-brands fa-html5"></i></li>
								<li><i className="fa-brands fa-css3-alt"></i></li>
								<li><i className="fa-brands fa-react"></i></li>
							</ul>
							<a className='tile-link' href='https://github.com/kevjbaumgartner/portfolio' target='_blank' rel='noreferrer'><i className="fa-solid fa-link"></i> Link</a>
						</div>
					</div>
				</div>
				<div className='tile'>
					<img className='tile-img' src={require('../assets/tile-mtgdeckbuilder.jpg')} alt=''></img>
					<div className='tile-content'>
						<span className='tile-title'>MTG Deck Builder</span>
						<p className='tile-text'>
							Deck builder for the Magic: The Gathering trading card game. Uses the <a className='focus-link' href='https://scryfall.com/docs/api' target='_blank' rel="noreferrer">Scryfall card
								database API</a> for queries, and React for the front end.
						</p>
						<div className='tile-footer'>
							<ul className='tile-stack'>
								<li><i className="fa-brands fa-html5"></i></li>
								<li><i className="fa-brands fa-css3-alt"></i></li>
								<li><i className="fa-brands fa-react"></i></li>
								<li><i className="fa-solid fa-cloud"></i></li>
							</ul>
							<a className='tile-link' href='https://github.com/kevjbaumgartner/MTG-DeckBuilder' target='_blank' rel='noreferrer'><i className="fa-solid fa-link"></i> Link</a>
						</div>
					</div>
				</div>
				<div className='tile'>
					<img className='tile-img' src={require('../assets/tile-spacestagram.jpg')} alt=''></img>
					<div className='tile-content'>
						<span className='tile-title'>Spacestagram</span>
						<p className='tile-text'>
							Social media style photo browser for Mars rovers.
							Made for the winter 2022 Shopify front end developer challenge. Made using vanilla
							technologies and the <a className='focus-link' href='https://api.nasa.gov/' target='_blank' rel="noreferrer">NASA rover photo API</a>.
						</p>
						<div className='tile-footer'>
							<ul className='tile-stack'>
								<li><i className="fa-brands fa-html5"></i></li>
								<li><i className="fa-brands fa-css3-alt"></i></li>
								<li><i className="fa-brands fa-js"></i></li>
								<li><i className="fa-solid fa-cloud"></i></li>
							</ul>
							<a className='tile-link' href='https://github.com/kevjbaumgartner/Shopify-2022-FED-IC' target='_blank' rel='noreferrer'><i className="fa-solid fa-link"></i> Link</a>
						</div>
					</div>
				</div>
				<div className='tile'>
					<img className='tile-img' src={require('../assets/tile-udsearch.jpg')} alt=''></img>
					<div className='tile-content'>
						<span className='tile-title'>Urban Dictionary Search</span>
						<p className='tile-text'>
							Minimalized user interface for the Urban Dictionary search engine
							using their <a className='focus-link' href='https://api.urbandictionary.com/v0/define?term=hello%20world' target='_blank' rel="noreferrer">open API</a>. Created with vanilla technologies and the JavaScript graphing library, Chart.js.
						</p>
						<div className='tile-footer'>
							<ul className='tile-stack'>
								<li><i className="fa-brands fa-html5"></i></li>
								<li><i className="fa-brands fa-css3-alt"></i></li>
								<li><i className="fa-brands fa-js"></i></li>
								<li><i className="fa-solid fa-cloud"></i></li>
							</ul>
							<a className='tile-link' href='https://github.com/kevjbaumgartner/UrbanDictionarySearch' target='_blank' rel='noreferrer'><i className="fa-solid fa-link"></i> Link</a>
						</div>
					</div>
				</div>
				<div className='tile'>
					<img className='tile-img' src={require('../assets/tile-chartest.jpg')} alt=''></img>
					<div className='tile-content'>
						<span className='tile-title'>CHARTest</span>
						<p className='tile-text'>
							A fast-paced touch typing game made using vanilla technologies.
							Features a reactive on-screen keyboard, a foresight setting for practice,
							and accuracy/time-based scoring.
						</p>
						<div className='tile-footer'>
							<ul className='tile-stack'>
								<li><i className="fa-brands fa-html5"></i></li>
								<li><i className="fa-brands fa-css3-alt"></i></li>
								<li><i className="fa-brands fa-js"></i></li>
							</ul>
							<a className='tile-link' href='https://github.com/kevjbaumgartner/CHARTest' target='_blank' rel='noreferrer'><i className="fa-solid fa-link"></i> Link</a>
						</div>
					</div>
				</div>
				<div className='tile'>
					<img className='tile-img' src={require('../assets/tile-hirakana.jpg')} alt=''></img>
					<div className='tile-content'>
						<span className='tile-title'>Hira-Kana</span>
						<p className='tile-text'>
							Minimalistic flashcard game to aid with Japanese hiragana and katakana memorization. Features configurable language options,
							as well the amount of choices.
						</p>
						<div className='tile-footer'>
							<ul className='tile-stack'>
								<li><i className="fa-brands fa-html5"></i></li>
								<li><i className="fa-brands fa-css3-alt"></i></li>
								<li><i className="fa-brands fa-js"></i></li>
							</ul>
							<a className='tile-link' href='https://github.com/kevjbaumgartner/Hira-Kana' target='_blank' rel='noreferrer'><i className="fa-solid fa-link"></i> Link</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};