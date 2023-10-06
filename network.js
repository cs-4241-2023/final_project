const {Server} = require('socket.io')

let io = undefined
const connectedPlayers = {}

class SocketServer {

	constructor(httpServer) {
		io = new Server(httpServer)
		console.log('Socket.IO running')

		io.on('connection', onConnection)
	}

	/**
	 * Broadcasts a message to all currently connected clients
	 * @param {string} messageName The name of this message. This serves as a simple indicator about the type of message that you are sending.
	 * @param {object} object The object that will be send to clients.
	 */
	broadcast(messageName, object) {
		io.emit(messageName, object)
	}
}

const onConnection = function(socket) {
	socket.on('movement', (obj) => {
		socket.broadcast.emit('remoteMovement', obj)
		connectedPlayers[obj.id] = obj.msg
	})

	socket.emit('setID', socket.id)
	socket.emit('spawn', connectedPlayers)

	let newObj = {}
	newObj[socket.id] = {}
	socket.broadcast.emit('spawn', newObj)
	
	connectedPlayers[socket.id] = {}

	console.log('User Connected:', connectedPlayers)

	//console.log(this)
	

	socket.on('disconnect', (reason) => {
		io.emit('kill', socket.id)
		delete connectedPlayers[socket.id]
		console.log('User Disconnected:', connectedPlayers)
	})
}

module.exports = SocketServer