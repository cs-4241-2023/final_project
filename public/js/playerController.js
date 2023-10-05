kaboom({
    background: [0, 0, 0],
    width: 1024,
    height: 640,
    scale: 1,
    debug: true,
});


// load a sprite called "bean"
loadSprite("puffle-red", "../sprites/puffle-red.png")

// compose the player game object from multiple components and add it to the game
const puffle = add([
    sprite("puffle-red"),
    pos(80, 40),
    area(),
    body(),
])

add([
    pos(0, 0),
    circle(16),
])

// press w to move up
onKeyDown("w", () => {
	puffle.move(0, -300)
})

// press s to move down
onKeyDown("s", () => {
	puffle.move(0, 300)
})

// press a to move down
onKeyDown("a", () => {
	puffle.move(-300, 0)
})

// press d to move down
onKeyDown("d", () => {
	puffle.move(300, 0)
})