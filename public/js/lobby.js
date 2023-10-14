import sendNetworkMessage from "./clientNetworking.js"
import { global, highlight, unHighlight } from "./global.js"

//initialize layers
const layers = {
	"bg": -1,
	"bg-obj": 0,
	"game": 1,
	"ui": 2
}

const BUILDING_LOCATIONS = {
	puffleShop: new Vec2(285, 320),
	dojo: new Vec2(520, 150),
	abandoned: new Vec2(739, 320)
}

loadSprite("vista", "../background/vista.png")
loadSprite("dojo", "../background_interactables/dojoBuilding.png")
loadSprite("abandoned", "../background_interactables/abandonedBuilding.png")
loadSprite("puffleShop", "../background_interactables/puffleShop.png")
loadSprite("dojoHighlight", "../background_interactables/highlight/dojoBuildingHighlight.png")
loadSprite("puffleShopHighlight", "/background_interactables/highlight/puffleShopHighlight.png")


scene("lobby", () => {
	// compose the player game object from multiple components and add it to the game
	const player = add([
		sprite(global.CURRENT_PUFFLE),
		pos(global.LOBBY_SPAWN.x, global.LOBBY_SPAWN.y),
		z(layers.game),
		scale(0.5, 0.5),
		anchor("center"),
	])

	// Spawn Vista
	add([
		sprite("vista"),
		pos(0, 0),
		z(layers.bg),
	])
	spawnBuildings()


	let curTween = null
	//movement
	onMousePress("left", () => {
		if (curTween) {
			curTween.cancel()
		}

		let tweenTime = Math.sqrt(Math.pow(player.pos.x - mousePos().x, 2) + Math.pow(player.pos.y - mousePos().y, 2)) / global.SPEED

		curTween = tween(player.pos, mousePos(), tweenTime, (p) => {
			player.pos = p
			sendNetworkMessage("movement", player.pos)
		}, easings.easeOutSine)
	})

	//interact
	onClick("puffleShop", (building) => {
		if (curTween) {
			curTween.cancel()
		}

		let tweenTime = Math.sqrt(Math.pow(player.pos.x - mousePos().x, 2) + Math.pow(player.pos.y - mousePos().y, 2)) / global.SPEED

		curTween = tween(player.pos, mousePos(), tweenTime, (p) => {
			player.pos = p
			sendNetworkMessage("movement", player.pos)
		}, easings.easeOutSine).then(() => {
				go("puffle_store")
				sendNetworkMessage("joinSubScene", { scene: "puffle_store" })
			})
	})

	onClick("dojoBuilding", (building) => {
		if (curTween) {
			curTween.cancel()
		}

		let tweenTime = Math.sqrt(Math.pow(player.pos.x - mousePos().x, 2) + Math.pow(player.pos.y - mousePos().y, 2)) / global.SPEED

		curTween = tween(player.pos, mousePos(), tweenTime, (p) => {
			player.pos = p
			sendNetworkMessage("movement", player.pos)
		}, easings.easeOutSine).then(() => {
				go("dojo")
				sendNetworkMessage("changeScene", { scene: "dojo", pos: global.DOJO_SPAWN, puffle: global.CURRENT_PUFFLE })
			})
	})
})

function spawnBuildings() {
	const puffleShop = add([
		sprite("puffleShop"),
		pos(BUILDING_LOCATIONS.puffleShop),
		z(layers.bg),
		anchor("center"),
		area(),
		"puffleShop",
	])

	const dojoBuilding = add([
		sprite("dojo"),
		pos(BUILDING_LOCATIONS.dojo),
		z(layers.bg),
		anchor("center"),
		area(),
		"dojoBuilding",
		scale(0.25)
	])

	add([
		sprite("abandoned"),
		pos(BUILDING_LOCATIONS.abandoned),
		z(layers.bg),
		anchor("center"),
		area(),
		"abandonedBuilding",
	])

	dojoBuilding.onHover(() => highlight(dojoBuilding, "dojoHighlight"))
	dojoBuilding.onHoverEnd(() => unHighlight(dojoBuilding, "dojo", 0.25))

	puffleShop.onHover(() => highlight(puffleShop, "puffleShopHighlight"))
	puffleShop.onHoverEnd(() => unHighlight(puffleShop, "puffleShop"))
}
