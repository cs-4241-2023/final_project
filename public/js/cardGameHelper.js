import { highlight, unHighlight, global } from "./global.js"

const spriteDict = {
	"GoldCard": ["gold1", "gold2", "gold3"],
	"SoilCard": ["soil1", "soil2", "soil3"],
	"WaterCard": ["water1", "water2", "water3"],
}

export let opponentId = undefined
export let myCard = undefined
let opponentCard = undefined
let opponentCardSprite = undefined

export function setOpponentID(id) {
	opponentId = id
}

export function setMyCard(cardInfo) {
	myCard = cardInfo
	if (opponentCard !== undefined) {
		makeOpponentCard(spriteDict[opponentCard.type][opponentCard.value - 1])
		return compareCards()
	} else {
		return null
	}
}

export function setOpponentCard(cardInfo) {
	opponentCard = cardInfo
	if (myCard !== undefined) {
		makeOpponentCard(spriteDict[opponentCard.type][opponentCard.value - 1])
		return compareCards()
	} else {
		makeOpponentCard("card-back")
		return null
	}
}

export function resetFields() {
	opponentId = undefined
	myCard = undefined
	opponentCard = undefined
	opponentCardSprite = undefined
}

export function displayText(message) {
	let backButton = add([
		sprite("back-button"),
		pos(10, 10),
		"backButton",
		area(),
		scale(0.35)
	])

	backButton.onHover(() => highlight(backButton, "back-button-highlight", 0.4))
	backButton.onHoverEnd(() => unHighlight(backButton, "back-button", 0.35))

	return backButton
}

function makeOpponentCard(spriteName) {
	if(opponentCardSprite !== undefined) {
		destroy(opponentCardSprite)
	}

	opponentCardSprite = add([
		sprite(spriteName),
		pos(3 * global.SCREEN_SIZE.width / 4, (global.SCREEN_SIZE.height / 2) - 50),
		anchor("center"),
		scale(0.35)
	])
}

function compareCards() {
	const typeMap = {
		"GoldCard": 0,
		"SoilCard": 1,
		"WaterCard": 2
	}

	// https://stackoverflow.com/questions/2795399/one-liner-to-determine-who-wins-in-rock-paper-scissors#:~:text=winner%20%3D%20(3%20%2B%20player1%20%2D,item%20defeats%20the%20preceding%20one.
	// This will give 1 if player 1 wins, 2 if player 2 wins, 0 for a tie.
	// In the sequence Gold=0, Soil=1, Water=2, each item defeats the preceding one.
	const player1 = typeMap[myCard.type]
	const player2 = typeMap[opponentCard.type]
	const winner = (3 + player1 - player2) % 3

	if (winner === 1) {
		return "win"
	} else if (winner === 2) {
		return "lose"
	} else if (winner === 0) {
		return compareValue()
	}
}

function compareValue() {
	if (myCard.value > opponentCard.value) {
		return "win"
	} else if (myCard.value < opponentCard.value) {
		return "lose"
	} else {
		return "tie"
	}
}