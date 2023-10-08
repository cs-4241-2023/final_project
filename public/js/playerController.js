import sendNetworkMessage from "./clientNetworking.js";

//const network = NetworkManager.getConnection()
const SPEED = 2
export const SPAWN = { x: 80, y: 40 }

kaboom({
	background: [0, 0, 0],
	width: 1024,
	height: 640,
	scale: 1,
	debug: true,
});

//initialize layers
let layers = {
	"bg": -1,
	"bg-obj": 0,
	"game": 1,
	"ui": 2,
}

loadSprite("puffle-red", "../sprites/puffle-red.png")

scene("lobby", () => {

	let BUILDING_LOCATIONS = {
		puffleShop: new Vec2(300, 300),
		dojo: new Vec2(512, 150),
		abandoned: new Vec2(724, 300),
	}

	loadSprite("vista", "../background/vista.png")
	loadSprite("dojo", "../background_interactables/dojoBuilding.png")
	loadSprite("abandoned", "../background_interactables/abandonedBuilding.png")
	loadSprite("puffleShop", "../background_interactables/puffleShop.png")


	// compose the player game object from multiple components and add it to the game
	const player = add([
		sprite("puffle-red"),
		pos(SPAWN.x, SPAWN.y),
		z(layers.game),
		scale(0.5, 0.5),
		anchor("center"),
	])

	spawnBackground()

	function spawnBackground() {
		spawnVista()
		spawnBuildings()
	}

	function spawnBuildings() {
		add([
			sprite("dojo"),
			pos(BUILDING_LOCATIONS.dojo),
			z(layers.bg),
			anchor("center"),
			area(),
			"dojoBuilding",
		])

		add([
			sprite("abandoned"),
			pos(BUILDING_LOCATIONS.abandoned),
			z(layers.bg),
			anchor("center"),
			area(),
			"abandonedBuilding",
		])

		add([
			sprite("puffleShop"),
			pos(BUILDING_LOCATIONS.puffleShop),
			z(layers.bg),
			anchor("center"),
			area(),
			"puffleShop",
		])
	}

	function spawnVista() {
		add([
			sprite("vista"),
			pos(0, 0),
			z(layers.bg),
		])
	}

	let curTween = null
	//movement
	onMousePress("right", () => {


		if (curTween) {
			curTween.cancel()
		}

		curTween = tween(player.pos, mousePos(), SPEED,
			(p) => {
				player.pos = p
				sendNetworkMessage('movement', player.pos)
			}, easings.easeOutSine)

	})

	//interact
	onClick("dojoBuilding", (building) => {
		if (curTween) {
			curTween.cancel()
		}

		curTween = tween(player.pos, mousePos(), SPEED,
			(p) => {
				player.pos = p
				sendNetworkMessage('movement', player.pos)
			}, easings.easeOutSine).then(() => go("dojo"))
	})

})

scene("dojo", () => {

	let MAX_HEIGHT = 400
	let MAT_LOCATION = {
		0: new Vec2(300, 580),
		1: new Vec2(400, 520),
		2: new Vec2(675, 580),
		3: new Vec2(590, 520),
	}
	let DOOR_LOCATION = new Vec2(380, 335)

	loadSprite("dojo-mat", "../background_interactables/mat.png")
	loadSprite("background-dojo", "../background/dojo.png")
	loadSprite("dojo-door", "../background_interactables/door.png")

	//add background
	const background = add([
		sprite("background-dojo"),
		pos(0, 0),
		z(layers.bg)
	])

	const player = add([
		sprite("puffle-red"),
		pos(DOOR_LOCATION.x, DOOR_LOCATION.y + 80),
		z(layers.game),
		scale(0.5, 0.5),
		anchor("center"),
	])

	spawnInteractables()

	let curTween = null

	//movement
	onMousePress("right", () => {

		if (curTween) {
			curTween.cancel()
		}

		if (mousePos().y > MAX_HEIGHT) {
			curTween = tween(player.pos, mousePos(), SPEED,
				(p) => {
					player.pos = p
					sendNetworkMessage('movement', player.pos)
				}, easings.easeOutSine)
		}
		else {
			curTween = tween(player.pos, new Vec2(mousePos().x, MAX_HEIGHT), SPEED, (p) => {
				player.pos = p
				sendNetworkMessage('movement', player.pos)
			}
				, easings.easeOutSine)
		}

	})

	//interact
	onClick("dojo-door", (door) => {
		if (curTween) {
			curTween.cancel()
		}
		
		curTween = tween(player.pos, mousePos(), SPEED,
			(p) => {
				player.pos = p
				sendNetworkMessage('movement', player.pos)
			}, easings.easeOutSine).then(() => go("lobby"))
	})

	function spawnInteractables() {
		spawMats()
		spawnDoor()
	}

	function spawnDoor() {
		add([
			sprite("dojo-door"),
			pos(DOOR_LOCATION),
			"dojo-door",
			z(layers["bg-obj"]),
			anchor("center"),
			area(),
		])
	}

	function spawMats() {
		for (let i = 0; i < 4; i++) {
			add([
				sprite("dojo-mat"),
				pos(MAT_LOCATION[i]),
				"mat",
				z(layers["bg-obj"]),
				anchor("center"),
				area()
			])
		}
	}

	function interact(tag) {
		switch (tag) {
			case "dojo-door":
				go("lobby")
				break;
			case "dojo-mat":
				break;
			default:
				break;
		}
	}
})

go("lobby")