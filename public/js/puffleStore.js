const START = { x: 20, y: 200 }
const puffleList = []
const puffleBuyList = []
let background
let cancel
let coinLabel
let displayIsVisible = true

let layers = {
    "hidden": -1,
    "background": 0,
    "display": 1,
    "front": 2,
    "buy": 3
}

scene("puffle_store", async () => {
    const getResponse = await fetch('/user')
    const userInfo = await getResponse.json()

    //Load Background
    loadSprite("puffleShop", "../background/dojo.png")
    background = add([
        sprite("puffleShop"),
        pos(0, 0),
        z(layers.background)
    ])

    //Load cancel button
    cancel = add([
        text("Cancel", 12),
        pos(0, 0),
        color(0, 0, 0),
        area(),
        z(layers.hidden),
        "cancel"
    ])

    //Load player coin label
    coinLabel = add([
        text(`Coins: ${userInfo.coins}`, 12),
        pos(800, 590),
        color(0, 0, 0),
        z(layers.buy)
    ])

    const puffleSprites = [
        { sprite: "puffle-red.png", price: 100 },
        { sprite: "puffle-green.png", price: 200 },
        { sprite: "puffle-blue.png", price: 300 },
        { sprite: "puffle-purple.png", price: 400 }
    ]

    for (let i = 0; i < puffleSprites.length; i++) {
        loadSprite(puffleSprites[i].sprite.split(".")[0], `../sprites/${puffleSprites[i].sprite}`)
        const puffleBuy = addPuffleViewer(puffleSprites[i].sprite.split(".")[0], puffleSprites[i].price, userInfo)
        puffleBuyList.push(puffleBuy)
    }

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
            background.z = layers.front
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

    onClick("cancel", (cancel) => {
        if (cancel.z === layers.buy) {
            for (let i = 0; i < puffleBuyList.length; i++) {
                puffleBuyList[i].puffleBuy.z = layers.hidden
                puffleBuyList[i].priceTag.z = layers.hidden
            }
            cancel.z = layers.hidden
            background.z = layers.background
            displayIsVisible = true
        }
    })
})

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
                headers: {'Content-Type': "application/json"},
                body
            })

            priceTag.text = "Unequip"
            updateViewers(puffleBuy.id)
        }
        else if (priceTag.text === "Unequip") {
            const body = JSON.stringify({ username: userInfo.username, puffleName: "" })
            const postRespone = await fetch('/equip', {
                method: 'POST',
                headers: {'Content-Type': "application/json"},
                body
            })

            priceTag.text = "Equip"
        }
        else {
            const body = JSON.stringify({ username: userInfo.username, puffleName: puffleName, price: price })
            const postResponse = await fetch('/purchase', {
                method: 'POST',
                headers: {'Content-Type': "application/json"},
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

function updateViewers(id) {
    for (let i = 0; i < puffleBuyList.length; i++) {
        if (puffleBuyList[i].puffleBuy.id !== id && (puffleBuyList[i].priceTag.text === "Equip" || puffleBuyList[i].priceTag.text === "Unequip")) {
            puffleBuyList[i].priceTag.text = "Equip"
        }
    }
}
