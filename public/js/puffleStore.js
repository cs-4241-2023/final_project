kaboom({
    background: [255, 255, 255],
	width: 1024,
	height: 640,
	scale: 1,
	debug: true,});

const START = {x: 20, y: 40};
const puffleList = [];

scene("puffle_store", async () => {
    const getResponse = await fetch(`/user/admin`, {
        method: 'GET'
    });

    const text = await getResponse.text();
    const userInfo = JSON.parse(text);

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
        let puffle = displayPuffleWithPrice(xOffset, sprite.split(".")[0], price, userInfo);
        puffleList.push(puffle);
        xOffset = xOffset + 250;
    }

    onMousePress(() => {
        const mousePosition = mousePos();
        for (let i = 0; i < puffleList.length; i++) {
            if (mousePosition.x >= puffleList[i].puffle.pos.x && mousePosition.x <= puffleList[i].puffle.pos.x + puffleList[i].puffle.width && mousePosition.y >= puffleList[i].puffle.pos.y && mousePosition.y <= puffleList[i].puffle.pos.y + puffleList[i].puffle.height) {
                puffleList[i].puffle.onClick();
            }
        }
    })
});

function displayPuffleWithPrice(xPos, puffleSprite, price, userInfo) {
    const priceTagText = userInfo.purchasedPuffles.includes(puffleSprite) ? "Purchased" : `$${price}`;

    const puffle = add([
        sprite(puffleSprite),
        pos(xPos, START.y),
        area(),
        z(2)]);

    const priceTag = add([
        text(`${priceTagText}`, 12),
        pos(xPos, puffle.pos.y - puffle.height),
        color(0, 0, 0),
        z(2)
    ]);

    puffle.onClick = async function() {
        const body = JSON.stringify({ _id: "6522f7a13b601563446db64b", puffleName: puffleSprite, price: price});
        const postResponse = await fetch('/purchase', {
            method: 'POST',
            body
        });

        const text = await postResponse.text();
        const result = JSON.parse(text);
        if (result.status === 1) {
            priceTag.text = "Purchased";
        }
    }

    return { puffle: puffle, priceTag: priceTag };
}

go("puffle_store");