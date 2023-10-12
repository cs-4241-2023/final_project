import sendNetworkMessage from "./clientNetworking.js"
import { global } from "./global.js"


const CARDSLOTS = [
	new Vec2(280, 600),
	new Vec2(500, 600),
	new Vec2(720, 600)
]

let myCard
let opponentCard

let youWin
let tie


loadSprite("backgroundBlank", "../background/blank.png")

loadSprite("card-back", "../cards/card-back.png")
loadSprite("water1", "../cards/water-1.png")
loadSprite("water2", "../cards/water-2.png")
loadSprite("water3", "../cards/water-3.png")
loadSprite("soil1", "../cards/soil-1.png")
loadSprite("soil2", "../cards/soil-2.png")
loadSprite("soil3", "../cards/soil-3.png")
loadSprite("gold1", "../cards/gold-1.png")
loadSprite("gold2", "../cards/gold-2.png")
loadSprite("gold3", "../cards/gold-3.png")


// Card Game Code
scene("card", () => {
	//add background
	add([
		sprite("backgroundDojo"),
		pos(0, 0)
	])
	add([
		sprite("backgroundBlank"),
		pos(0, 0),
		opacity(0.7)
	])


	beginHand()

	// Play Cards
	onClick("Cards", (card) => {
		// Send card type & value to server so opponent can see card
		myCard = {
			type: card.cardType,
			value: card.cardVal
		}

		card.moveTo(global.SCREEN_SIZE.width / 4, (global.SCREEN_SIZE.height / 2) - 50)
		console.log(myCard.type)
		console.log(myCard.value)

		compareCards()
	})
})


function beginHand() {
	const deck = [
		{ cardType: "WaterCard", cardVal: 1, spriteName: "water1" },
		{ cardType: "WaterCard", cardVal: 2, spriteName: "water2" },
		{ cardType: "WaterCard", cardVal: 3, spriteName: "water3" },
		{ cardType: "GoldCard", cardVal: 1, spriteName: "gold1" },
		{ cardType: "GoldCard", cardVal: 2, spriteName: "gold2" },
		{ cardType: "GoldCard", cardVal: 3, spriteName: "gold3" },
		{ cardType: "SoilCard", cardVal: 1, spriteName: "soil1" },
		{ cardType: "SoilCard", cardVal: 2, spriteName: "soil2" },
		{ cardType: "SoilCard", cardVal: 3, spriteName: "soil3" }
	]

	// Begin game with 3 cards
	CARDSLOTS.forEach(slotPos => {
		const randIndex = Math.floor(Math.random() * deck.length)
		createCard(deck[randIndex], slotPos)
		deck.splice(randIndex, 1)
	})

	// Create Opponent Cards
	CARDSLOTS.forEach(slotPos => {
		add([
			sprite("card-back"),
			pos(new Vec2(slotPos.x, -20)),
			anchor("center"),
			scale(0.35),
			rotate(180)
		])
	})
}

function createCard(cardObj, position) {
	const card = add([
		sprite(cardObj.spriteName),
		pos(position),
		"Cards",
		area(),
		anchor("center"),
		scale(0.35),
		{
			cardType: cardObj.cardType,
			cardVal: cardObj.cardVal
		}
	])
	
	const shiftDistance = 40
	card.onHover(() => card.moveTo(card.pos.x, card.pos.y - shiftDistance))
	card.onHoverEnd(() => card.moveTo(card.pos.x, card.pos.y + shiftDistance))
}


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
	const player1 = typeMap[myCard.type]
	const player2 = typeMap[opponentCard.type]
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
	if (myCard.value > opponentCard.value) {
		youWin = true
		moveCard()
	} else if (myCard.value < opponentCard.value) {
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