import sendNetworkMessage from "./clientNetworking.js"
import { global, highlight, unHighlight } from "./global.js"

//initialize layers
const layers = {
	"hidden": -2,
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
loadSprite("dojoArches", "../background_interactables/arches.png")
loadSprite("dojoArchesHighlight", "/background_interactables/highlight/archesHighlight.png")
loadSprite("dojoRules", "/sprites/rules2.png")
loadSprite("backgroundBlank", "../background/blank.png")
loadSprite("back-button", "../background_interactables/backButton.png")
loadSprite("back-button-highlight", "../background_interactables/highlight/backButtonHighlight.png")

let player
let waitingAt
let rulesShown = false

scene("dojo", () => {
	//add background
	add([
		sprite("backgroundDojo"),
		pos(0, 0),
		z(layers.bg)
	])

	waitingAt = -1
	player = add([
		sprite(global.CURRENT_PUFFLE),
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

		if(rulesShown){
			curTween.cancel()
			return
		}

		if (mousePos().y > MAX_HEIGHT) {
			curTween = moveToLocation(mousePos())
		}
		else {
			curTween = moveToLocation(new Vec2(mousePos().x, MAX_HEIGHT))
		}
	})

	//interact
	onClick("dojoDoor", (door) => {
		if (curTween) {
			curTween.cancel()
		}

		if(rulesShown){
			curTween.cancel()
			return
		}

		curTween = moveToLocation(new Vec2(global.DOJO_SPAWN.x, global.DOJO_SPAWN.y)).then(() => {
			go("lobby")
			sendNetworkMessage("changeScene", { scene: "lobby", pos: global.LOBBY_SPAWN, puffle: global.CURRENT_PUFFLE })
		})
	})

	onClick("mat", (mat) => {
		if (curTween) {
			curTween.cancel()
		}

		if(rulesShown){
			curTween.cancel()
			return
		}

		curTween = moveToLocation(mousePos()).then(() => {
			waitingAt = mat.matNum
			sendNetworkMessage("waitAtMat", mat.matNum)
		})
	})

	onClick("dojoArches", (arches) => {
		showRules()
	})

	onClick("backButtonRules", (button) => {
		closeRules()
	})
})

function spawnInteractables() {
	spawMats()
	spawnDoor()
	spawnArches()
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

	door.onHover(() => {
		if(rulesShown){
			return
		}
		highlight(door, "dojoDoorHighlight")
	})
	door.onHoverEnd(() => {
		if(rulesShown){
			return
		}
		unHighlight(door, "dojoDoor")
	})
}

function spawnArches(){
	let arches = add([
		sprite("dojoArches"),
		pos(DOOR_LOCATION.x + 250, DOOR_LOCATION.y),
		"dojoArches",
		z(layers["bg-obj"]),
		anchor("center"),
		area(),
		scale(0.45)
	])

	arches.onHover(() => {
		if(rulesShown){
			return
		}
		highlight(arches, "dojoArchesHighlight", 0.49)
	})
	arches.onHoverEnd(() => {
		unHighlight(arches, "dojoArches", 0.45)
	})
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

		mat.onHover(() => {
			if(rulesShown){
				return
			}
			highlight(mat, "dojoMatHighlight")
		})
		mat.onHoverEnd(() => {
			if(rulesShown){
				return
			}
			unHighlight(mat, "dojoMat")
		})
	}
}

function showRules() {
	add([
		sprite("backgroundBlank"),
		pos(0, 0),
		opacity(0.7),
		z(layers.ui),
		"rules",
	])

	add([
		sprite("dojoRules"),
		pos(new Vec2(global.SCREEN_SIZE.width / 2, global.SCREEN_SIZE.height / 2)),
		z(layers.ui),
		"rules",
		scale(0.5),
		anchor("center")
	])

	let backButtonRules = add([
		sprite("back-button"),
		pos(10, 10),
		"backButtonRules",
		area(),
		scale(0.35),
		z(layers.ui)
	])

	backButtonRules.onHover(() => highlight(backButtonRules, "back-button-highlight", 0.4))
	backButtonRules.onHoverEnd(() => unHighlight(backButtonRules, "back-button", 0.35))

	rulesShown = true
}

function closeRules() {
	destroyAll("rules")
	destroyAll("backButtonRules")

	rulesShown = false
}

function moveToLocation(destination) {
	if ( waitingAt !== -1) {
		sendNetworkMessage("endWait", waitingAt)
		waitingAt = -1
	}

	return tween(player.pos, destination, global.SPEED, (p) => {
		player.pos = p
		sendNetworkMessage("movement", player.pos)
	}, easings.easeOutSine)
}
