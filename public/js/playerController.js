const network = NetworkManager.getConnection()
const SPEED = 300

const remotePlayers = {}
const spawnRemotePlayer = function(playerID) {
	remotePlayers[playerID] = add([
		sprite("puffle-red"),
		pos(80, 40)
	])
}

const removeRemotePlayer = function(id) {
	destroy(remotePlayers[id]) // removes player from kaboom
	delete remotePlayers[id] // removes player from map
}

const moveRemotePlayer = function(id, vector) {
	remotePlayers[id].move(vector.x, vector.y)
}

kaboom({
	background: [0, 0, 0],
	width: 1024,
	height: 640,
	scale: 1,
	debug: true,
});

// load the red puffle sprite
loadSprite("puffle-red", "../sprites/puffle-red.png")

// compose the player game object from multiple components and add it to the game
const puffle = add([
	sprite("puffle-red"),
	pos(80, 40)
])

/*
add([
	pos(0, 0),
	circle(16),
])
*/

// press w to move up
onKeyDown("w", () => {
	puffle.move(0, -SPEED)
	network.sendMessage('movement', {x: 0, y: -SPEED})
})

// press s to move down
onKeyDown("s", () => {
	puffle.move(0, SPEED)
	network.sendMessage('movement', {x: 0, y: SPEED})
})

// press a to move down
onKeyDown("a", () => {
	puffle.move(-SPEED, 0)
	network.sendMessage('movement', {x: -SPEED, y: 0})
})

// press d to move down
onKeyDown("d", () => {
	puffle.move(SPEED, 0)
	network.sendMessage('movement', {x: SPEED, y: 0})
})