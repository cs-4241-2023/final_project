const express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	SocketServer = require('./network.js'),
	network = new SocketServer(server), //used to broadcast a message to all currently connected clients
	port = process.env.PORT || 3000

app.use( express.static( 'public' ) )

server.listen(port, function() {
	console.log(`Express listening on port ${port}`)
})