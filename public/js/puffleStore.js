import sendNetworkMessage from "./clientNetworking.js"
import { global, highlight, unHighlight, setPuffle } from "./global.js"

let purchasedPuffles = []
let coinLabel

// Position variables for puffles & labels (4 puffles total)
const startX = (global.SCREEN_SIZE.width / 4) - (global.SCREEN_SIZE.width / 8)
const spacingX = global.SCREEN_SIZE.width / 4
const puffleY = global.SCREEN_SIZE.height / 2
const labelY = 3 * global.SCREEN_SIZE.height / 4

const labels = {}
const puffleCosts = {
	"puffle-red": { price: 100, order: 0 },
	"puffle-green": { price: 200, order: 1 },
	"puffle-blue": { price: 300, order: 2 },
	"puffle-purple": { price: 400, order: 3 }
}

loadSprite("shopBackground", "../background/shop.png")
loadSprite("backgroundBlank", "../background/blank.png")

loadSprite("back-button", "../background_interactables/backButton.png")
loadSprite("back-button-highlight", "../background_interactables/highlight/backButtonHighlight.png")

scene("puffle_store", async () => {
	const userInfo = await fetch('/user').then((response) => response.json())
	purchasedPuffles = userInfo.purchasedPuffles
	//setPuffle(userInfo.equippedPuffle)

	//Load Background
	add([
		sprite("shopBackground"),
		pos(0, 0)
	])
	add([
		sprite("backgroundBlank"),
		pos(0, 0),
		opacity(0.7)
	])

	const backButton = add([
		sprite("back-button"),
		pos(10, 10),
		"backButton",
		area(),
		scale(0.35)
	])

	backButton.onHover(() => highlight(backButton, "back-button-highlight", 0.4))
	backButton.onHoverEnd(() => unHighlight(backButton, "back-button", 0.35))
	backButton.onClick(() => {
		go("lobby")
		sendNetworkMessage("changeScene", { scene: "lobby", pos: global.LOBBY_SPAWN, puffle: global.CURRENT_PUFFLE })
	})

	//Load player coin label
	const labelPadding = 10
	coinLabel = add([
		text(`Coins: ${userInfo.coins}`, 12),
		pos(global.SCREEN_SIZE.width - labelPadding, labelPadding),
		color(0, 0, 0),
		anchor("topright")
	])


	for (let [puffleName, puffleInfo] of Object.entries(puffleCosts)) {
		// Create puffle sprite
		const puffle = add([
			sprite(puffleName),
			pos(startX + spacingX * puffleInfo.order, puffleY),
			area(),
			anchor("center"),
			scale(0.7),
			{
				name: puffleName
			}
		])
		puffle.onHover(() => highlight(puffle, puffleName, 0.8))
		puffle.onHoverEnd(() => unHighlight(puffle, puffleName, 0.7))

		let labelText
		if (!purchasedPuffles.includes(puffleName)) {
			labelText = `$${puffleInfo.price}`
		} else if (global.CURRENT_PUFFLE === puffleName) {
			labelText = "Equiped"
		} else {
			labelText = ""
		}

		// Create associated label
		labels[puffleName] = add([
			text(labelText, 12),
			pos(startX + spacingX * puffleInfo.order, labelY),
			color(0, 0, 0),
			anchor("center")
		])

		puffle.onClick(() => selectPuffle(puffle))
	}
})

async function selectPuffle(puffle) {
	if (!purchasedPuffles.includes(puffle.name)) {
		let body = JSON.stringify({
			puffleName: puffle.name,
			price: puffleCosts[puffle.name].price,
		})
		let result = await fetch("/purchase", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body
		})

		let resultJSON = await result.json()

		if (resultJSON.success) {
			labels[puffle.name].use(text(""), 12)
			coinLabel.use(text(`Coins: ${resultJSON.coinsRemaining}`, 12))
			purchasedPuffles.push(puffle.name)
		} else {
			return
		}
	}

	fetch("/equip", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ puffleName: puffle.name })
	})

	for (let [puffleName, label] of Object.entries(labels)) {
		if (purchasedPuffles.includes(puffleName)) {
			label.use(text("", 12))
		} else {
			label.use(text(`$${puffleCosts[puffleName].price}`, 12))
		}
	}

	labels[puffle.name].use(text("Equiped", 12))
	setPuffle(puffle.name)
}