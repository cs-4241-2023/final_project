kaboom({
    background: [255, 255, 255],
	width: 1024,
	height: 640,
	scale: 1,
	debug: true,});

const START = {x: 20, y: 40};

scene("puffle_store", () => {
    //Load puffle sprites
    const puffleSprites = [ { sprite: "puffle-red.png", price: 100 },
                            { sprite: "puffle-green.png", price: 200 },
                            { sprite: "puffle-blue.png", price: 300 },
                            { sprite: "puffle-black.png", price: 400 }];
    for (let i = 0; i < puffleSprites.length; i++) {
        loadSprite(puffleSprites[i].sprite.split(".")[0], `../sprites/${puffleSprites[i].sprite}`);
    }

    //Place sprites on screen horizontally aligned
    let xOffset = START.x;
    for (let i = 0; i < puffleSprites.length; i++) {
        const { sprite, price } = puffleSprites[i];
        displayPuffleWithPrice(xOffset, sprite.split(".")[0], price);
        xOffset = xOffset + 250;
    }
});

function displayPuffleWithPrice(xPos, puffleSprite, price) {
    const puffle = add([sprite(puffleSprite), pos(xPos, START.y)]);
    puffle.layer = "ui";

    const priceTag = add([
        text(`$${price}`, 12),
        pos(xPos, puffle.pos.y - puffle.height),
        color(0, 0, 0)
    ]);
    priceTag.layer = "ui";
}

go("puffle_store");