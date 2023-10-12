export let opponentId = undefined
let myCard = undefined
let opponentCard = undefined

export function setOpponentID(id) {
	opponentId = id
}

export function setMyCard(cardInfo) {
	myCard = cardInfo
	if((myCard !== undefined) && (opponentCard !== undefined)) {
		compareCards()
	}
}

export function setOpponentCard(cardInfo) {
	opponentCard = cardInfo
	if((myCard !== undefined) && (opponentCard !== undefined)) {
		compareCards()
	}
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