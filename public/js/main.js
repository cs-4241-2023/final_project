import sendNetworkMessage from "./clientNetworking.js"
import { global } from "./global.js"


kaboom({
	background: [0, 0, 0],
	width: global.SCREEN_SIZE.width,
	height: global.SCREEN_SIZE.height,
	scale: 1,
	debug: true
})

// Sprites that will be used in every scene
loadSprite("puffle-red", "../sprites/puffle-red.png")
loadSprite("puffle-blue", "../sprites/puffle-blue.png")
loadSprite("puffle-green", "../sprites/puffle-green.png")
loadSprite("puffle-black", "../sprites/puffle-black.png")

window.onload = () => {
	go("lobby")
	sendNetworkMessage("changeScene", { scene: "lobby", pos: global.LOBBY_SPAWN })
}