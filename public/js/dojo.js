import sendNetworkMessage from "./clientNetworking.js"
import { global, highlight, unHighlight } from "./global.js"

//initialize layers
const layers = {
	"bg": -1,
	"bg-obj": 0,
	"game": 1,
	"ui": 2
}

const MAX_HEIGHT = 400
const MAT_LOCATION = {
	0: new Vec2(300, 580),
	1: new Vec2(400, 520),
	2: new Vec2(675, 580),
	3: new Vec2(590, 520),
}
const DOOR_LOCATION = new Vec2(global.DOJO_SPAWN.x, global.DOJO_SPAWN.y - 50)

loadSprite("dojoMat", "../background_interactables/mat.png")
loadSprite("backgroundDojo", "../background/dojo.png")
loadSprite("dojoDoor", "../background_interactables/dojoDoor.png")
loadSprite("dojoMatHighlight", "/background_interactables/highlight/matHighlight.png")
loadSprite("dojoDoorHighlight", "/background_interactables/highlight/dojoDoorHighlight.png")


scene("dojo", () => {
	//add background
	add([
		sprite("backgroundDojo"),
		pos(0, 0),
		z(layers.bg)
	])

	const player = add([
		sprite("puffle-red"),
		pos(global.DOJO_SPAWN.x, global.DOJO_SPAWN.y),
		z(layers.game),
		scale(0.5, 0.5),
		anchor("center"),
	])

	spawnInteractables()

	let curTween = null

	//movement
	onMousePress("left", () => {
		if (curTween) {
			curTween.cancel()
		}

		if (mousePos().y > MAX_HEIGHT) {
			curTween = tween(player.pos, mousePos(), global.SPEED, (p) => {
				player.pos = p
				sendNetworkMessage("movement", player.pos)
			}, easings.easeOutSine)
		}
		else {
			curTween = tween(player.pos, new Vec2(mousePos().x, MAX_HEIGHT), global.SPEED, (p) => {
				player.pos = p
				sendNetworkMessage("movement", player.pos)
			}, easings.easeOutSine)
		}
	})

	//interact
	onClick("dojoDoor", (door) => {
		if (curTween) {
			curTween.cancel()
		}

		curTween = tween(player.pos, mousePos(), global.SPEED, (p) => {
			player.pos = p
			sendNetworkMessage("movement", player.pos)
		}, easings.easeOutSine)
		.then(() => {
			go("lobby")
			sendNetworkMessage("changeScene", { scene: "lobby", pos: global.LOBBY_SPAWN })
		})
	})

	onClick("mat", (mat) => {
		if (curTween) {
			curTween.cancel()
		}

		curTween = tween(player.pos, mousePos(), global.SPEED, (p) => {
			player.pos = p
			sendNetworkMessage("movement", player.pos)
		}, easings.easeOutSine)
		.then(() => {
			//go("lobby")
			//sendNetworkMessage("changeScene", { scene: "lobby", pos: global.LOBBY_SPAWN })
			sendNetworkMessage("waitAtMat", mat.matNum)
		})
	})
})

function spawnInteractables() {
	spawMats()
	spawnDoor()
}

function spawnDoor() {
	let door = add([
		sprite("dojoDoor"),
		pos(DOOR_LOCATION),
		"dojoDoor",
		z(layers["bg-obj"]),
		anchor("center"),
		area(),
	])

	door.onHover(() => highlight(door, "dojoDoorHighlight"))
	door.onHoverEnd(() => unHighlight(door, "dojoDoor"))
}

function spawMats() {
	for (let i = 0; i < 4; i++) {
		let mat = add([
			sprite("dojoMat"),
			pos(MAT_LOCATION[i]),
			"mat",
			z(layers["bg-obj"]),
			anchor("center"),
			area(),
			{
				matNum: i
			}
		])

		mat.onHover(() => highlight(mat, "dojoMatHighlight"))
		mat.onHoverEnd(() => unHighlight(mat, "dojoMat"))
	}
}