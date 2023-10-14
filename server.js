require('dotenv').config()

const express = require('express'),
	{ MongoClient } = require("mongodb"),
	cookie = require('cookie-session'),
	app = express(),
	server = require('http').createServer(app),
	SocketServer = require('./network.js'),
	handlebars = require('express-handlebars'),
	network = new SocketServer(server), //used to broadcast a message to all currently connected clients
	port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.engine('hbs', handlebars.engine({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'indexLayout'
}))
app.set('views', './views')

app.use(express.static('public'))
app.use(express.json())

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
const client = new MongoClient(uri)

let user_collection = null
async function run() {
	await client.connect()
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

app.use(express.urlencoded({ extended: true }))
app.use(cookie({
	name: 'session',
	keys: ['key1', 'key2']
}))

app.get('/', (req, res) => {
	res.render('index', {layout: 'indexLayout'})
})

// attempt to login
app.post('/login', async (req, res) => {
	const user = await user_collection.findOne({ username: req.body.username })
	
	if (user) {
		req.session.login = true
		req.session.username = req.body.username
		res.redirect('/game')
	}
	else {
		res.redirect('/authFail')
	}
})

// attempt to sign in
app.post('/signup', async (req, res) => {
	const user = await user_collection.findOne({ username: req.body.username })

	if(!user){
		const newUser = await user_collection.insertOne({
			username: req.body.username,
			coins: 10,
			purchasedPuffles: ["puffle-red"],
			equippedPuffle: "puffle-red"
			})
		req.session.login = true
		req.session.username = req.body.username
		res.redirect('/game')
	}
	else{
		res.redirect('/authFails')
	}
})

app.get('/authFail', (req, res) => {
	res.render("loginFail", {layout: "indexLayout"})
})

app.get('/authFails', (req, res) => {
	res.render("signupFail", {layout: "indexLayout"})
})

// redirect to login if not signed in
app.use(function (req, res, next) {
	if (req.session.login === true)
		next()
	else
		res.redirect('/')
})

// client navigates to game page
app.get('/game', (req, res) => {
	res.sendFile(__dirname + "/public/game.html")
})

// Client requests user information
app.get('/user', async (req, res) => {
	const username = req.session.username
	const user = await user_collection.findOne({ username: username })
	//console.log(user)

	res.json(user)
})

app.post('/purchase', async (req, res) => {
	let info = req.body

	const user = await user_collection.findOne({ username: req.session.username }) //Find user
	const purchaseResult = {}

	//Determine if transaction is possible
	if (user.coins >= info.price && !user.purchasedPuffles.includes(info.puffleName)) {
		user.coins -= info.price
		user.purchasedPuffles.push(info.puffleName)

		user_collection.updateOne(
			{ username: req.session.username },
			{ $set: { coins: user.coins, purchasedPuffles: user.purchasedPuffles } }
		)
		purchaseResult.success = true //Successful purchase
	}
	else {
		purchaseResult.success = false //Unsuccessful purchase
	}

	purchaseResult.coinsRemaining = user.coins

	res.json(purchaseResult)
})

app.post('/equip', async (req, res) => {
	let info = req.body

	const user = await user_collection.findOne({ username: req.session.username })

	if (user.purchasedPuffles.includes(info.puffleName)) {
		user_collection.updateOne({ username: req.session.username }, { $set: { equippedPuffle: info.puffleName } })
	}
	else {
		user_collection.updateOne({ username: req.session.username }, { $set: { equippedPuffle: "" } })
	}

	res.json({ result: "Done" })
})

app.post('/addCoins', (req, res) => {
	let coin = req.body.coins
	user_collection.updateOne({ username: req.session.username }, { $inc: { coins: coin } })
})


server.listen(port, function () {
	console.log(`Express listening on port ${port}`)
})