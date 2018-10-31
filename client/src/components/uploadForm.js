import React, { Component } from 'react';
import axios from 'axios';

export default class uploadForm extends Component {
	state = {
		description: '',
		selectedFile: '',
		previewUrl: ''
	};

	onChange = e => {
		switch (e.target.name) {
			case 'selectedFile':
				this.setState({ selectedFile: e.target.files[0] });
				break;
			default:
				this.setState({ [e.target.name]: e.target.value });
		}
	};

	onImageChange = e => {
		e.preventDefault();

		let eFile = e.target.files[0];
		let reader = new FileReader();

		reader.onloadend = () => {
			this.setState({
				selectedFile: eFile,
				previewUrl: reader.result
			});
		};

		reader.readAsDataURL(eFile);
	};

	onSubmit = e => {
		e.preventDefault();

		//collect the state of data from form...
		const { description, selectedFile } = this.state;

		//create form data into new
		let formData = new FormData();

		//Append (attach) formData
		formData.append('description', description);
		formData.append('selectedFile', selectedFile);

		//Post form Data into following (server.js post)
		axios.post('/', formData).then(result => {});

		//clear everything after submit
		e.target.reset();
		this.setState({
			description: '',
			selectedFile: '',
			previewUrl: ''
		});
	};

	render() {
		const { description, selectedFile, previewUrl } = this.state;
		let preview = null;

		preview = previewUrl ? (
			<object data={previewUrl} type="image/jpeg">
				File Selected!
			</object>
		) : (
			<div className="previewText">No File Selected</div>
		);

		return (
			<form onSubmit={this.onSubmit}>
				<input
					type="text"
					name="description"
					value={description}
					onChange={this.onChange}
				/>
				<input
					type="file"
					name="selectedFile"
					onChange={(this.onChange, this.onImageChange)}
				/>
				<button>Upload</button>
				<div className="imgPreview">{preview}</div>
			</form>
		);
	}
}
