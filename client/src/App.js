import React, { Component } from 'react';

//comopnents
import Upload from './components/uploadForm';

//style
import './scss/main.scss';

class App extends Component {
	render() {
		return (
			<div className="page-content">
				<header>
					<h1>File Upload</h1>
				</header>
				<div className="form__form-wrap">
					<Upload />
				</div>
			</div>
		);
	}
}

export default App;
