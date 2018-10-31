import React, { Component } from 'react';
import axios from 'axios';

export default class uploadForm extends Component {
	state = {
		description: '',
		selectedFile: '',
		imgPreviewUrl: ''
	};

	onChange = e => {
		e.preventDefault();

		let eFile = e.target.files[0];

		switch (e.target.name) {
			case 'selectedFile':
				this.setState({ selectedFile: eFile });
				break;
			default:
				this.setState({ [e.target.name]: e.target.value });
		}

		let reader = new FileReader();

		reader.onloadend = () => {
			this.setState({
				imgPreviewUrl: reader.result
			});
		};

		reader.readAsDataURL(eFile);
	};

	onSubmit = e => {
		e.preventDefault();
		const { description, selectedFile } = this.state;

		let formData = new FormData();

		formData.append('description', description);
		formData.append('selectedFile', selectedFile);

		axios.post('/', formData).then(result => {});
	};

	render() {
		const { description, selectedFile, imgPreviewUrl } = this.state;

		let imgPreview = null;
		if (imgPreviewUrl) {
			imgPreview = <img src={imgPreviewUrl} alt="" />;
		} else {
			imgPreview = (
				<div className="previewText">Please select an Image for Preview</div>
			);
		}
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						name="description"
						value={description}
						onChange={this.onChange}
					/>
					<input type="file" name="selectedFile" onChange={this.onChange} />
					<button>Upload</button>
				</form>
				<div className="imgPreview">{imgPreview}</div>
			</div>
		);
	}
}
