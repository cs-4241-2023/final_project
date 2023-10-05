const {Server} = require('socket.io')

class SocketServer {

	#io
	constructor(httpServer) {
		this.#io = new Server(httpServer)
		console.log('Socket.IO running')

		this.#io.on('connection', this.#onConnection)
	}

	broadcast(messageName, object) {
		this.#io.emit(messageName, object)
	}

	#onConnection(socket) {
		socket.emit('hello', {message: 'a new client connected'})
	}
}

module.exports = SocketServer