const {Server} = require('socket.io')

class SocketServer {

	#io
	constructor(httpServer) {
		this.#io = new Server(httpServer)
		console.log('Socket.IO running')

		this.#io.on('connection', onConnection)
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
	socket.broadcast.emit('spawn', socket.id)
	console.log('Connect:', socket.id)

	//console.log(this)
	socket.on('movement', onMovement)
}

const onMovement = function(obj) {
	let id = obj.id
	let msg = obj.msg
	console.log('Movement:', id, msg)
}

module.exports = SocketServer