require('dotenv').config()

const express = require('express'),
	{ MongoClient, ObjectId } = require("mongodb"),
	app = express(),
	server = require('http').createServer(app),
	SocketServer = require('./network.js'),
	network = new SocketServer(server), //used to broadcast a message to all currently connected clients
	port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.json())

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
const client = new MongoClient(uri)

let user_collection = null
async function run() {
	await client.connect();
	user_collection = client.db("club_pigeon").collection("users")
}
run()

app.use((req, res, next) => {
	if (user_collection !== null) {
		next()
	} else {
		res.status(503).send()
	}
})

app.get('/user/:username', async (req, res) => {
	const username = req.params.username;
	const user = await user_collection.findOne({ username: username })

	res.json(user)
})

app.post('/purchase', async (req, res) => {
	let info = req.body

	const user = await user_collection.findOne({ username: info.username }); //Find user
	const purchaseResult = {}

	//Determine if transaction is possible
	if (user.coins >= info.price && !user.purchasedPuffles.includes(info.puffleName)) {
		user.coins -= info.price
		user.purchasedPuffles.push(info.puffleName);

		const result = await user_collection.updateOne(
			{ username: info.username },
			{ $set: { coins: user.coins, purchasedPuffles: user.purchasedPuffles } }
		)
		purchaseResult.status = 1 //Successful purchase
	}
	else {
		purchaseResult.status = -1 //Unsuccessful purchase
	}
	purchaseResult.coinsRemaining = user.coins

	res.json(purchaseResult)
})

app.post('/equip', async (req, res) => {
	let info = req.body

	const user = await user_collection.findOne({ username: info.username })

	if (user.purchasedPuffles.includes(info.puffleName)) {
		user_collection.updateOne({ username: info.username }, { $set: { equippedPuffle: info.puffleName } })
	}
	else {
		user_collection.updateOne({ username: info.username }, { $set: { equippedPuffle: "" } })
	}

	res.json({ result: "Done" })
})

server.listen(port, function () {
	console.log(`Express listening on port ${port}`)
})