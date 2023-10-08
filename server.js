require('dotenv').config();

const express = require('express'),
	{ MongoClient, ObjectId } = require("mongodb"),
	app = express(),
	server = require('http').createServer(app),
	SocketServer = require('./network.js'),
	network = new SocketServer(server), //used to broadcast a message to all currently connected clients
	port = process.env.PORT || 3000

app.use( express.static( 'public' ) )

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`;
const client = new MongoClient(uri);

let user_colletion = null;

app.use( (req, res, next) => {
	if(user_colletion !== null) {
	  next();
	}else{
	  res.status( 503 ).send();
	}
});

server.listen(port, function() {
	console.log(`Express listening on port ${port}`)
})