let socket = undefined;
let canvas = undefined
let keyboardLayoutMap = undefined

window.onload = async function() {
	canvas = document.querySelector('canvas')
	keyboardLayoutMap = await navigator.keyboard.getLayoutMap()
	socket = io()

	socket.on('hello', function(message) {
		console.log(message)
	})

	document.onkeydown = keydown
}

const keydown = function( event ) {
	let bool = event.code == keyboardLayoutMap.get('KeyW')
	console.log(keyboardLayoutMap.get('KeyW'), bool)
}