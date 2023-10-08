const network = NetworkManager.getConnection()
const SPEED = 300
const SPAWN = { x: 80, y: 40 }

// -------------- Start Network Functions -----------------------

const remotePlayers = {}
const spawnRemotePlayer = function (id, positon) {
	let x = positon.x || SPAWN.x
	let y = positon.y || SPAWN.y
	remotePlayers[id] = add([
		sprite("puffle-red"),
		pos(x, y)
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

// -------------- End NEtwork Functions -------------------------

kaboom({
	background: [0, 0, 0],
	width: 1024,
	height: 640,
	scale: 1,
	debug: true,
});

// load the red puffle sprite
loadSprite("puffle-red", "../sprites/puffle-red.png")

scene("lobby", () => {
	/*
	add([
		pos(0, 0),
		circle(16),
	])
	*/

	// compose the player game object from multiple components and add it to the game
	const puffle = add([
		sprite("puffle-red"),
		pos(SPAWN.x, SPAWN.y),
		z(1),
	])


	// press w to move up
	onKeyDown("w", () => {
		puffle.move(0, -SPEED)
		network.sendMessage('movement', puffle.pos)
	})

	// press s to move down
	onKeyDown("s", () => {
		puffle.move(0, SPEED)
		network.sendMessage('movement', puffle.pos)
	})

	// press a to move down
	onKeyDown("a", () => {
		puffle.move(-SPEED, 0)
		network.sendMessage('movement', puffle.pos)
	})

	// press d to move down
	onKeyDown("d", () => {
		puffle.move(SPEED, 0)
		network.sendMessage('movement', puffle.pos)
	})
})

go("lobby")