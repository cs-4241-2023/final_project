import { SPAWN } from "./playerController.js"

// Socket Initialization
const network = io()
network.on('setID', function(newID) {
	this.id = newID
	this.emit('movement', {id: newID, msg: SPAWN})
})

network.on('spawn', (players) => {
	for (const [id, pos] of Object.entries(players)) {
		spawnRemotePlayer(id, pos)
	}
})

network.on('setPositions', (players) => {
	for (const [id, pos] of Object.entries(players)) {
		setRemotePosition(id, pos)
	}
})

network.on('remoteMovement', (movement) => moveRemotePlayer(movement.id, movement.msg))
network.on('kill', (id) => removeRemotePlayer(id))


// Public Functions

/**
  * Sends a message to the server
  * @param {string} messageName The name of this message. This serves as a simple indicator about the type of message that you are sending.
  * @param {object} object The object that will be send to clients.
  */
function sendNetworkMessage(messageName, object) {
	network.emit(messageName, {id: network.id, msg: object})
}



// Private Functions

const remotePlayers = {}
const spawnRemotePlayer = function (id, positon) {
	let x = positon.x || SPAWN.x
	let y = positon.y || SPAWN.y
	remotePlayers[id] = add([
		sprite("puffle-red"),
		pos(x, y),
		scale(0.5, 0.5)
	])
}

const removeRemotePlayer = function (id) {
	console.log('Deleting:', id)
	destroy(remotePlayers[id]) // removes player from kaboom
	delete remotePlayers[id] // removes player from map
}

const moveRemotePlayer = function (id, vector) {
	console.log(id, remotePlayers[id])
	remotePlayers[id].moveTo(vector.x, vector.y)
}

export default sendNetworkMessage