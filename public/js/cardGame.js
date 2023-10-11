import sendNetworkMessage from "./clientNetworking"
import { global } from "./global"


const CARDSLOTS = [
	new Vec2(300, 500),
	new Vec2(500, 500),
	new Vec2(700, 500)
]

let myCard
let opponentCard

let youWin
let tie


// Card Game Code
scene("card", () => {
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

	// Begin game with 3 cards
	CARDSLOTS.forEach(slotPos => {
		randIndex = Math.floor(Math.random() * deck.length)
		createCard(deck[randIndex], slotPos)
		deck.splice(randIndex, 1)
	})
}

function createCard(cardObj, position) {
	add([
		sprite(cardObj.spriteName),
		pos(position),
		"Cards",
		area(),
		anchor("center"),
		{
			cardType: cardObj.cardType,
			cardVal: cardObj.cardVal
		}
	])

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