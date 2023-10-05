const express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	SocketServer = require('./network.js'),
	network = new SocketServer(server),
	port = process.env.PORT || 3000

app.use( express.static( 'public' ) )

server.listen(port, function() {
	console.log(`Express listening on port ${port}`)
})