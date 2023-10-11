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
		sprite("puffle-red"),
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

		curTween = tween(player.pos, mousePos(), global.SPEED,
			(p) => {
				player.pos = p
				sendNetworkMessage("movement", player.pos)
			}, easings.easeOutSine)
	})

	//interact
	onClick("puffleShop", (building) => {
		if (curTween) {
			curTween.cancel()
		}

		curTween = tween(player.pos, mousePos(), global.SPEED,
			(p) => {
				player.pos = p
				sendNetworkMessage("movement", player.pos)
			}, easings.easeOutSine).then(() => {
				go("puffle_store")
				sendNetworkMessage("changeScene", { scene: "puffle_store", pos: {} })
			})
	})

	onClick("dojoBuilding", (building) => {
		if (curTween) {
			curTween.cancel()
		}

		curTween = tween(player.pos, mousePos(), global.SPEED,
			(p) => {
				player.pos = p
				sendNetworkMessage("movement", player.pos)
			}, easings.easeOutSine).then(() => {
				go("dojo")
				sendNetworkMessage("changeScene", { scene: "dojo", pos: global.DOJO_SPAWN })
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
	dojoBuilding.onHoverEnd(() => unHighlight(dojoBuilding, "dojo"))

	puffleShop.onHover(() => highlight(puffleShop, "puffleShopHighlight"))
	puffleShop.onHoverEnd(() => unHighlight(puffleShop, "puffleShop"))
}



// Card Game Code
scene("card", () => {
	let myCardType
	let myCardValue
	let opponentCardType = "WaterCard"
	let opponentCardValue = 1
	let youWin
	let tie = false
	let CARDSLOTS = {
		first: new Vec2(300, 500),
		second: new Vec2(500, 500),
		thrid: new Vec2(700, 500)
	}

	function createCard(cardObj, position) {
		add([
			sprite(cardObj.spriteName),
			pos(position),
			"Cards",
			cardObj.cardType,
			area(),
			anchor("center"),
			{
				cardType: cardObj.cardType,
				cardVal: cardObj.cardVal
			}
		])

	}


	// Begin game with 3 cards
	function beginHand() {
		let deck = [
			{ cardType: "WaterCard", cardVal: 1, spriteName: "puffle-blue" },
			{ cardType: "WaterCard", cardVal: 2, spriteName: "puffle-blue" },
			{ cardType: "WaterCard", cardVal: 3, spriteName: "puffle-blue" },
			{ cardType: "GoldCard", cardVal: 1, spriteName: "puffle-red" },
			{ cardType: "GoldCard", cardVal: 2, spriteName: "puffle-red" },
			{ cardType: "GoldCard", cardVal: 3, spriteName: "puffle-red" },
			{ cardType: "SoilCard", cardVal: 1, spriteName: "puffle-green" },
			{ cardType: "SoilCard", cardVal: 2, spriteName: "puffle-green" },
			{ cardType: "SoilCard", cardVal: 3, spriteName: "puffle-green" }
		]
		let randomCard1 = Math.floor(Math.random() * deck.length)
		let randomCard2 = Math.floor(Math.random() * deck.length)
		let randomCard3 = Math.floor(Math.random() * deck.length)

		createCard(deck[randomCard1], CARDSLOTS.first)
		createCard(deck[randomCard2], CARDSLOTS.second)
		createCard(deck[randomCard3], CARDSLOTS.thrid)
		deck.splice(randomCard1, 1)
		deck.splice(randomCard2, 1)
		deck.splice(randomCard3, 1)

	}

	beginHand()


	// Play Cards
	onClick("Cards", (card) => {
		// Send card type & value to server so opponent can see card
		myCardType = card.cardType
		myCardValue = card.cardVal

		card.moveTo(global.SCREEN_SIZE.width / 4, (global.SCREEN_SIZE.height / 2) - 50)
		console.log(card.cardType)
		console.log(card.cardVal)

		compareCards()

	})


	function compareCards() {
		const typeMap = {
			"GoldCard": 0,
			"SoilCard": 1,
			"WaterCard": 2
		}

		tie = false

		// https://stackoverflow.com/questions/2795399/one-liner-to-determine-who-wins-in-rock-paper-scissors#:~:text=winner%20%3D%20(3%20%2B%20player1%20%2D,item%20defeats%20the%20preceding%20one.
		// This will give 1 if player 1 wins, 2 if player 2 wins, 0 for a tie.
		// In the sequence Gold=0, Soil=1, Water=2, each item defeats the preceding one.
		const player1 = typeMap[myCardType]
		const player2 = typeMap[opponentCardType]
		const winner = (3 + player1 - player2) % 3

		if (winner === 1) {
			youWin = true
			moveCard()
		} else if (winner === 2) {
			youWin = false
			deleteCard()
		} else if (winner === 0) {
			compareValue()
		}
	}

	function compareValue() {
		if (myCardValue > opponentCardValue) {
			youWin = true
			moveCard()
		} else if (myCardValue < opponentCardValue) {
			youWin = false
			deleteCard()
		} else {
			tie = true
		}
	}

	function deleteCard() {
		onUpdate("Cards", (card) => {
			if (card.pos.x == global.SCREEN_SIZE.width / 4) {
				destroy(card)
			}
		})
	}

	function moveCard() {
		onUpdate("Cards", (card) => {
			if (card.pos.x == global.SCREEN_SIZE.width / 4) {
				card.moveTo(global.SCREEN_SIZE.width / 2, (global.SCREEN_SIZE.height / 2) - 50)
			}
		})
	}


})


