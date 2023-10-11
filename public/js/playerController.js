import sendNetworkMessage from "./clientNetworking.js";

const SPEED = 2
const LOBBY_SPAWN = { x: 80, y: 40 }
const DOJO_SPAWN = { x: 380, y: 415 }
const SCREEN_SIZE = { width: 1024, height: 640 }

kaboom({
	background: [0, 0, 0],
	width: SCREEN_SIZE.width,
	height: SCREEN_SIZE.height,
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
loadSprite("puffle-blue", "../sprites/puffle-blue.png")
loadSprite("puffle-green", "../sprites/puffle-green.png")

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
		pos(LOBBY_SPAWN.x, LOBBY_SPAWN.y),
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
			}, easings.easeOutSine).then(() => {
				go("dojo")
				sendNetworkMessage('changeScene', { scene: 'dojo', pos: DOJO_SPAWN })
			})
	})

})

scene("dojo", () => {

	const MAX_HEIGHT = 400
	const MAT_LOCATION = {
		0: new Vec2(300, 580),
		1: new Vec2(400, 520),
		2: new Vec2(675, 580),
		3: new Vec2(590, 520),
	}
	const DOOR_LOCATION = new Vec2(DOJO_SPAWN.x, DOJO_SPAWN.y - 80)

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
		pos(DOJO_SPAWN.x, DOJO_SPAWN.y),
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
			}, easings.easeOutSine)
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
			}, easings.easeOutSine).then(() => {
				go("lobby")
				sendNetworkMessage('changeScene', { scene: 'lobby', pos: LOBBY_SPAWN })
			})
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


// Card Game Code
scene("card", () => {

	let myCardType;
	let myCardValue;
	let opponentCardType = "WaterCard";
	let opponentCardValue = 1;
	let youWin;
	let tie = false;
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
			{cardType: 'WaterCard', cardVal: 1, spriteName: 'puffle-blue'},
			{cardType: 'WaterCard', cardVal: 2, spriteName: 'puffle-blue'}, 
			{cardType: 'WaterCard', cardVal: 3, spriteName: 'puffle-blue'}, 
			{cardType: 'GoldCard', cardVal: 1, spriteName: 'puffle-red'}, 
			{cardType: 'GoldCard', cardVal: 2, spriteName: 'puffle-red'}, 
			{cardType: 'GoldCard', cardVal: 3, spriteName: 'puffle-red'}, 
			{cardType: 'SoilCard', cardVal: 1, spriteName: 'puffle-green'}, 
			{cardType: 'SoilCard', cardVal: 2, spriteName: 'puffle-green'},
			{cardType: 'SoilCard', cardVal: 3, spriteName: 'puffle-green'}
		]
		let randomCard1 = Math.floor(Math.random() * deck.length);
		let randomCard2 = Math.floor(Math.random() * deck.length);
		let randomCard3 = Math.floor(Math.random() * deck.length);

		createCard(deck[randomCard1], CARDSLOTS.first);
		createCard(deck[randomCard2], CARDSLOTS.second);
		createCard(deck[randomCard3], CARDSLOTS.thrid);
		deck.splice(randomCard1, 1);
		deck.splice(randomCard2, 1);
		deck.splice(randomCard3, 1);
		
	}
	
	beginHand();


	// Play Cards
	onClick("Cards", (card) => {
		// Send card type & value to server so opponent can see card
		myCardType = card.cardType;
		myCardValue = card.cardVal;

		card.moveTo(SCREEN_SIZE.width / 4, (SCREEN_SIZE.height / 2 ) - 50)
		console.log(card.cardType)
		console.log(card.cardVal)

		compareCards();

	})


	function compareCards() {

		tie = false;

		if(myCardType == "WaterCard" && opponentCardType == "WaterCard") {
			compareValue();
		} else if(myCardType == "WaterCard" && opponentCardType == "SoilCard") {
			youWin = true;
			moveCard();
		} else if(myCardType == "WaterCard" && opponentCardType == "GoldCard") {
			youWin = false;
			deleteCard();
		} else if(myCardType == "SoilCard" && opponentCardType == "SoilCard") {
			compareValue();
		} else if(myCardType == "SoilCard" && opponentCardType == "GoldCard") {
			youWin = true;
			moveCard();
		} else if(myCardType == "SoilCard" && opponentCardType == "WaterCard") {
			youWin = false;
			deleteCard();
		} else if(myCardType == "GoldCard" && opponentCardType == "GoldCard") {
			compareValue();
		} else if(myCardType == "GoldCard" && opponentCardType == "SoilCard") {
			youWin = false;
			deleteCard();
		} else if(myCardType == "GoldCard" && opponentCardType == "WaterCard") {
			youWin = true;
			moveCard();
		} else {
			return -1;
		}
	}

	function compareValue() {
		if(myCardValue > opponentCardValue){
			youWin = true;
			moveCard();
		} else if(myCardValue < opponentCardValue) {
			youWin = false;
			deleteCard();
		} else {
			tie = true;
		}
	}

	function deleteCard() {
		onUpdate("Cards", (card) => {
			if(card.pos.x == SCREEN_SIZE.width / 4) {
				destroy(card)
			}
		})
	}

	function moveCard(){
		onUpdate("Cards", (card) => {
			if(card.pos.x == SCREEN_SIZE.width / 4) {
				card.moveTo(SCREEN_SIZE.width / 2, (SCREEN_SIZE.height / 2) - 50)
			}
		})
	}


})

go("card");
sendNetworkMessage('changeScene', { scene: 'card', pos: LOBBY_SPAWN });