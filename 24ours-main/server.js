// Configure Express.js.
let express = require('express');
let app = express();
let port = 3000;
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

// Set payload size to 10mb.
let bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '10mb'}));
app.use(express.json());

// Serve React app.
let path = require('path');
app.use(express.static(path.join(__dirname, '/frontend/build')));

// Configure environment variables.
require('dotenv').config()

// Configure axios.
let axios = require('axios');
let instance = axios.create({
	baseURL: process.env.API_ENDPOINT_URL,
});

// GET and POST requests.
// Load the React project when the page is loaded.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
});

// Forward the payload to API Gateway.
app.post('/uploadfile', async (request, result) => {
	instance.post('/uploadfile', {
		'fileName': request.body.fileName,
		'fileBody': request.body.fileBody
	})
	.then(response => {
		result.status(200).json(response.data);
	})
	.catch((error) => {
		result.status(400).json({'message': error});
	});
});