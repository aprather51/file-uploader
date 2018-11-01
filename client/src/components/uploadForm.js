import React, { Component } from 'react';
import axios from 'axios';

//icon
import { ReactComponent as FileUpload } from '../svg/fileupload.svg';

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

	handleReset = e => {
		e.preventDefault();
		//reset everything
		//e.target.reset();
		this.setState({
			description: '',
			selectedFile: '',
			previewUrl: ''
		});
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
		let file = null;

		preview = previewUrl ? (
			<object className="previewText" data={previewUrl} type="image/jpeg">
				File Selected!
			</object>
		) : (
			<div className="previewText">No File Selected</div>
		);

		//--------------
		file = selectedFile ? (
			<span>File: {selectedFile.name}</span>
		) : (
			<span>
				<figure>
					<FileUpload className="icon-upload" />
				</figure>
				<p>Choose a file...</p>
			</span>
		);

		console.log(selectedFile.name);
		return (
			<form onSubmit={this.onSubmit}>
				<div className="form__file-select-wrap">
					<input
						id="file"
						className="input-file"
						type="file"
						name="selectedFile"
						onChange={(this.onChange, this.onImageChange)}
					/>
					<label htmlFor="file">{file}</label>
				</div>

				<div className="preview-wrap">{preview}</div>

				<div className="input-wrap">
					<input
						className="input-text"
						type="text"
						name="description"
						value={description}
						onChange={this.onChange}
						placeholder="include your description..."
					/>
				</div>
				<div className="btn-wrap">
					<button className="btn">Upload</button>
					<div className="btn" onClick={this.handleReset}>
						Reset
					</div>
				</div>
			</form>
		);
	}
}
