const {Server} = require('socket.io')

const connectedPlayers = []

class SocketServer {
	#io
	constructor(httpServer) {
		this.#io = new Server(httpServer)
		console.log('Socket.IO running')

		this.#io.on('connection', onConnection)
		this.#io.on('disconnect', onDisconnect)
	}

	/**
	 * Broadcasts a message to all currently connected clients
	 * @param {string} messageName The name of this message. This serves as a simple indicator about the type of message that you are sending.
	 * @param {object} object The object that will be send to clients.
	 */
	broadcast(messageName, object) {
		this.#io.emit(messageName, object)
	}
}

const onConnection = function(socket) {
	socket.emit('setID', socket.id)
	socket.emit('spawn', connectedPlayers)
	socket.broadcast.emit('spawn', [socket.id])
	connectedPlayers.push(socket.id)
	console.log('Connected:', connectedPlayers)

	//console.log(this)
	socket.on('movement', (obj) => socket.broadcast.emit('remoteMovement', obj))
}

const onDisconnect = function(socket) {
	socket.broadcast.emit('kill', socket.id)
	idIndex = connectedPlayers.findIndex(element => element == socket.id)
	connectedPlayers.splice(idIndex, 1)
	console.log('Disconnected:', connectedPlayers)
}

module.exports = SocketServer