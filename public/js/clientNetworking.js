// Socket Initialization
const network = io()
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

network.on('remoteMovement', (movement) => moveRemotePlayer(movement.id, movement.pos))
network.on('kill', (id) => removeRemotePlayer(id))

let currentScene = { scene: '', pos: {} }
network.on('sceneRequest', () => {console.log('requested');network.emit('changeScene', currentScene)})


// Public Functions

/**
  * Sends a message to the server
  * @param {string} messageName The name of this message. This serves as a simple indicator about the type of message that you are sending.
  * @param {object} object The object that will be send to clients.
  */
const sendNetworkMessage = function(messageName, object) {
	switch( messageName ) {
		case 'changeScene':
			currentScene = object
			break
		
		case 'movement':
			currentScene.pos = object
			break
	}
	network.emit(messageName, object)
}



// Private Functions

const remotePlayers = {}
const spawnRemotePlayer = function (id, positon) {
	let x = positon.x //|| SPAWN.x
	let y = positon.y //|| SPAWN.y
	remotePlayers[id] = add([
		sprite("puffle-red"),
		pos(x, y),
		scale(0.5, 0.5),
		anchor("center"),
	])
}

const removeRemotePlayer = function (id) {
	console.log('Deleting:', id)
	destroy(remotePlayers[id]) // removes player from kaboom
	delete remotePlayers[id] // removes player from map
}

const moveRemotePlayer = function (id, vector) {
	remotePlayers[id].moveTo(vector.x, vector.y)
}

export default sendNetworkMessage