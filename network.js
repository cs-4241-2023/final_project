const {Server} = require('socket.io')

let io = undefined
const connectedPlayers = {}
const matWaiting = [null, null, null, null]

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
		if(socketEntry.room === state.scene) {
			return
		}

		// Alert everyone to the scene change
		socket.leave(socketEntry.room)
		socket.broadcast.in(socketEntry.room).emit('kill', socket.id)

		// Spawn all players in destination scene
		const roomPlayers = {}
		for(const [id, obj] of Object.entries(connectedPlayers)) {
			if(obj.room === state.scene) {
				roomPlayers[id] = obj.pos
			}
		}
		socket.emit('spawn', roomPlayers)


		// Spawn player for remote clients in destination scene
		let newObj = {}
		newObj[socket.id] = state.pos
		socket.broadcast.in(state.scene).emit('spawn', newObj)
		
		// Join new scene
		socketEntry.room = state.scene
		socketEntry.pos = state.pos
		socket.join(state.scene)

		console.log(`${socket.id}:`, 'changing scene to', state)
	})
	
	socket.on('movement', (pos) => {
		const socketEntry = connectedPlayers[socket.id]
		socket.broadcast.in(socketEntry.room).emit('remoteMovement', { id: socket.id, pos })
		socketEntry.pos = pos
	})

	socket.on("waitAtMat", (matNum) => {
		if(matWaiting[matNum] !== null) {
			socket.emit("joinGame", matWaiting[matNum])
			io.to(matWaiting[matNum]).emit("joinGame", socket.id)
			matWaiting[matNum] = null
		} else {
			matWaiting[matNum] = socket.id
		}
	})

	socket.on("endWait", (matNum) => {
		matWaiting[matNum] = null
	})

	socket.on("joinSubScene", (sceneObj) => {
		socket.leave(connectedPlayers[socket.id].room)
		connectedPlayers[socket.id] = { room: sceneObj.scene }
	})

	socket.on('disconnect', (reason) => {
		socket.broadcast.in(connectedPlayers[socket.id].room).emit('kill', socket.id)
		delete connectedPlayers[socket.id]
		console.log('User Disconnected:', connectedPlayers)
	})

	socket.on('setScene', (sceneObj) => {
		socket.join(sceneObj.scene)
		connectedPlayers[socket.id].room = sceneObj.scene
		connectedPlayers[socket.id].pos = sceneObj.pos

		// Set all current players in destination scene
		const roomPlayers = {}
		for(const [id, obj] of Object.entries(connectedPlayers)) {
			if((obj.room === sceneObj.scene) && (id !== socket.id)) {
				roomPlayers[id] = obj.pos
			}
		}
		socket.emit('spawn', roomPlayers)

		let newObj = {}
		newObj[socket.id] = sceneObj.pos
		socket.broadcast.in(sceneObj.scene).emit('spawn', newObj)

		console.log(`${socket.id}:`, 'setting scene to', sceneObj)
	})

	socket.on("selectCard", (info) => {io.to(info.opponentId).emit("setOpponentCard", info.cardInfo)})


	connectedPlayers[socket.id] = { room: '', pos: {} }

	console.log('User Connected:', connectedPlayers)
}

module.exports = SocketServer