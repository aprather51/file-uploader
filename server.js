const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const uuid = require('uuid/v4');
const path = require('path');

//initate server
const server = express();
const port = process.env.PORT || 5000;

//body-parser
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//Set storage engine
const storage = multer.diskStorage({
	//place file in storage directory called 'uploads'
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},

	//generate a new file name by comine into unique id (uuid) and original file.
	filename: (req, file, cb) => {
		const newFileName = `${uuid()}${path.extname(file.originalname)}`;
		cb(null, newFileName);
	}
});

//create instance with multer that will be upload/save the file.
const upload = multer({ storage });

//Post the file prior to const upload (above)
server.post('/', upload.single('selectedFile'), (req, res) => {
	res.send();
});

server.listen(port, () =>
	console.log(`The server is listening on port ${port}`)
);
