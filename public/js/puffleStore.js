import sendNetworkMessage from "./clientNetworking.js"
import { global, highlight, unHighlight } from "./global.js"

let purchasedPuffles = []
let equippedPuffle
let coinLabel

// Position variables for puffles & labels (4 puffles total)
const startX = (global.SCREEN_SIZE.width / 4) - (global.SCREEN_SIZE.width / 8)
const spacingX = global.SCREEN_SIZE.width / 4
const puffleY = global.SCREEN_SIZE.height / 2
const labelY = 3 * global.SCREEN_SIZE.height / 4

/*
const layers = {
	"hidden": -1,
	"background": 0,
	"display": 1,
	"front": 2,
	"buy": 3
}
*/

const labels = {}
const puffleCosts = {
	"puffle-red": { price: 100, order: 0 },
	"puffle-green": { price: 200, order: 1 },
	"puffle-blue": { price: 300, order: 2 },
	"puffle-purple": { price: 400, order: 3 }
}
/*
[
	{ sprite: "puffle-red", price: 100 },
	{ sprite: "puffle-green.png", price: 200 },
	{ sprite: "puffle-blue.png", price: 300 },
	{ sprite: "puffle-purple.png", price: 400 }
]*/

loadSprite("shopBackground", "../background/shop.png")
loadSprite("backgroundBlank", "../background/blank.png")

loadSprite("back-button", "../background_interactables/backButton.png")
loadSprite("back-button-highlight", "../background_interactables/highlight/backButtonHighlight.png")

scene("puffle_store", async () => {
	const getResponse = await fetch('/user')
	const userInfo = await getResponse.json()

	purchasedPuffles = userInfo.purchasedPuffles
	equippedPuffle = userInfo.equippedPuffle
	console.log(userInfo)


	//Load Background
	add([
		sprite("shopBackground"),
		pos(0, 0),
		//z(layers.background)
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
		sendNetworkMessage("changeScene", { scene: "lobby", pos: global.LOBBY_SPAWN })
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
		if(!purchasedPuffles.includes(puffleName)) {
			labelText = `$${puffleInfo.price}`
		} else if (equippedPuffle === puffleName) {
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

		puffle.onClick(() => {console.log(puffle.name);selectPuffle(puffle)})
	}

	/*
	for (let i = 0; i < puffleSprites.length; i++) {
		const puffleBuy = addPuffleViewer(puffleSprites[i].sprite.split(".")[0], puffleSprites[i].price, userInfo)
		puffleBuyList.push(puffleBuy)
	}
	*/

	/*
	let xOffset = START.x
	for (let i = 0; i < puffleSprites.length; i++) {
		const puffleName = puffleSprites[i].sprite.split(".")[0]
		const puffle = add([
			sprite(puffleName),
			pos(xOffset, START.y),
			area(),
			z(layers.display),
			"puffle"
		])
		puffle.showMyViewer = function () {
			//background.z = layers.front
			cancel.z = layers.buy
			puffleBuyList[i].puffleBuy.z = layers.buy
			puffleBuyList[i].priceTag.z = layers.buy
			displayIsVisible = false
		}
		puffleList.push(puffle)
		xOffset = xOffset + 250
	}

	onClick("puffle", (puff) => {
		if (displayIsVisible) {
			puff.showMyViewer()
		}
	})

	onClick("puffleBuy", (puffB) => {
		if (puffB.z === layers.buy) {
			puffB.adoptPuffle()
		}
	})
	*/
})

async function selectPuffle(puffle) {
	if(!purchasedPuffles.includes(puffle.name)) {
		let body = JSON.stringify({
			puffleName: puffle.name,
			price: puffleCosts[puffle.name].price,
		})
		let result = await fetch("/purchase", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body
		})

		let resultJSON = await result.json()

		if(resultJSON.success) {
			labels[puffle.name].use(text(""), 12)
			coinLabel.use(text(`Coins: ${resultJSON.coinsRemaining}`, 12))
			purchasedPuffles.push(puffle.name)
		} else {
			return
		}
	}

	fetch("/equip", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({ puffleName: puffle.name })
	})

	for(let [puffleName, label] of Object.entries(labels)) {
		if( purchasedPuffles.includes(puffleName) ) {
			label.use(text("", 12))
		} else {
			label.use(text(`$${puffleCosts[puffleName].price}`, 12))
		}
	}

	labels[puffle.name].use(text("Equiped", 12))

}

/*
function addPuffleViewer(puffleName, price, userInfo) {
	const puffleBuy = add([
		sprite(puffleName),
		pos(400, 200),
		area(),
		z(layers.hidden),
		"puffleBuy"
	])

	let priceTagText = userInfo.purchasedPuffles.includes(puffleName) ? "Equip" : `${price}`
	priceTagText = userInfo.equippedPuffle === puffleName ? "Unequip" : priceTagText

	const priceTag = add([
		text(`${priceTagText}`, 12),
		pos(puffleBuy.pos.x, puffleBuy.pos.y),
		color(0, 0, 0),
		z(-1)
	])

	puffleBuy.adoptPuffle = async function () {
		if (priceTag.text === "Equip") {
			const body = JSON.stringify({ username: userInfo.username, puffleName: puffleName })
			const postRespone = await fetch('/equip', {
				method: 'POST',
				headers: { 'Content-Type': "application/json" },
				body
			})

			priceTag.text = "Unequip"
			updateViewers(puffleBuy.id)
		}
		else if (priceTag.text === "Unequip") {
			const body = JSON.stringify({ username: userInfo.username, puffleName: "" })
			const postRespone = await fetch('/equip', {
				method: 'POST',
				headers: { 'Content-Type': "application/json" },
				body
			})

			priceTag.text = "Equip"
		}
		else {
			const body = JSON.stringify({ username: userInfo.username, puffleName: puffleName, price: price })
			const postResponse = await fetch('/purchase', {
				method: 'POST',
				headers: { 'Content-Type': "application/json" },
				body
			})

			const result = await postResponse.json()
			if (result.status === 1) {
				priceTag.text = "Equip"
				coinLabel.text = `Coins: ${result.coinsRemaining}`
			}
		}
	}

	return { puffleBuy, priceTag }
}
*/
/*
function updateViewers(id) {
	for (let i = 0; i < puffleBuyList.length; i++) {
		if (puffleBuyList[i].puffleBuy.id !== id && (puffleBuyList[i].priceTag.text === "Equip" || puffleBuyList[i].priceTag.text === "Unequip")) {
			puffleBuyList[i].priceTag.text = "Equip"
		}
	}
}
*/