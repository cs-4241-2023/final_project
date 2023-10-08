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
	socket.on('changeScene', (state) => {
		const socketEntry = connectedPlayers[socket.id]

		socket.leave(connectedPlayers[socket.id].room)
		socket.broadcast.in(connectedPlayers[socket.id].room).emit('kill', socket.id)

		socketEntry.room = state.scene
		socketEntry.pos = state.pos

		let newObj = {}
		newObj[socket.id] = socketEntry.pos
		socket.broadcast.in(state.scene).emit('spawn', newObj)
		socket.join(state.scene)

		for(const [id, obj] of Object.entries(connectedPlayers)) {
			const player = {}
			player[id] = obj.pos
			if((obj.room === socketEntry.room) && (id !== socket.id)) {
				socket.emit('spawn', player)
			}
		}
	})
	
	socket.on('movement', (pos) => {
		const socketEntry = connectedPlayers[socket.id]
		socket.broadcast.in(socketEntry.room).emit('remoteMovement', { id: socket.id, pos })
		socketEntry.pos = pos
	})

	socket.on('disconnect', (reason) => {
		socket.broadcast.in(connectedPlayers[socket.id].room).emit('kill', socket.id)
		delete connectedPlayers[socket.id]
		console.log('User Disconnected:', connectedPlayers)
	})
	

	connectedPlayers[socket.id] = { pos: {}, room: '' }
	console.log('User Connected:', connectedPlayers)
}

module.exports = SocketServer