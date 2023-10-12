import sendNetworkMessage from "./clientNetworking.js"
import { setMyCard, opponentId, displayText, resetFields, myCard } from "./cardGameHelper.js"
import { global } from "./global.js"


const CARDSLOTS = [
	new Vec2(280, 600),
	new Vec2(500, 600),
	new Vec2(720, 600)
]


loadSprite("backgroundBlank", "../background/blank.png")

loadSprite("back-button", "../background_interactables/backButton.png")
loadSprite("back-button-highlight", "../background_interactables/highlight/backButtonHighlight.png")

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
		if(myCard == undefined) {
			// Send card type & value to server so opponent can see card
			const myCardInfo = {
				type: card.cardType,
				value: card.cardVal,
				i: card.i
			}

			setMyCard(myCardInfo)
			sendNetworkMessage("selectCard", { opponentId, cardInfo: myCardInfo })

			card.moveTo(global.SCREEN_SIZE.width / 4, (global.SCREEN_SIZE.height / 2) - 50)

		}

		card.moveTo(global.SCREEN_SIZE.width / 4, (global.SCREEN_SIZE.height / 2) - 50)
		sendNetworkMessage("selectCard", { opponentId, cardInfo: myCard })
		const result = setMyCard(myCard)

		let backButton
		switch(result) {
			case "win":
				backButton = displayText("You Win!")
				break

			case "lose":
				backButton = displayText("You Lose...")
				break

			case "tie":
				backButton = displayText("It's a Tie")
				break

			default:
				return
		}

		backButton.onClick(() => {
			resetFields()
			go("dojo")
			sendNetworkMessage("changeScene", { scene: "dojo", pos: global.DOJO_SPAWN })
		})
	})


	const shiftDistance = 40
	onHover("Cards", (card) => {
		if(myCard == undefined) {
			card.moveTo(card.pos.x, card.pos.y - shiftDistance)
		}
	})
	onHoverEnd("Cards", (card) => {
		if(myCard == undefined) {
			card.moveTo(card.pos.x, card.pos.y + shiftDistance)
		}
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
	for(let i = 0; i < CARDSLOTS.length; i++) {
		const randIndex = Math.floor(Math.random() * deck.length)
		createCard(deck[randIndex], CARDSLOTS[i], i)
		deck.splice(randIndex, 1)
	}

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

function createCard(cardObj, position, i) {
	add([
		sprite(cardObj.spriteName),
		pos(position),
		"Cards",
		area(),
		anchor("center"),
		scale(0.35),
		{
			cardType: cardObj.cardType,
			cardVal: cardObj.cardVal,
			i
		}
	])
}