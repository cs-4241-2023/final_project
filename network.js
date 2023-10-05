const {Server} = require('socket.io')

class SocketServer {

	#io
	constructor(httpServer) {
		this.#io = new Server(httpServer)
		console.log('Socket.IO running')

		this.#io.on('connection', this.#onConnection)
	}

	/**
	 * Broadcasts a message to all currently connected clients
	 * @param {string} messageName The name of this message. This serves as a simple indicator about the type of message that you are sending.
	 * @param {object} object The object that will be send to clients.
	 */
	broadcast(messageName, object) {
		this.#io.emit(messageName, object)
	}

	#onConnection(socket) {
		socket.emit('hello', {message: 'a new client connected'})
	}
}

module.exports = SocketServer