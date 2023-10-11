require('dotenv').config();

const express = require('express'),
	{ MongoClient, ObjectId } = require("mongodb"),
	app = express(),
	server = require('http').createServer(app),
	SocketServer = require('./network.js'),
	network = new SocketServer(server), //used to broadcast a message to all currently connected clients
	port = process.env.PORT || 3000

app.use( express.static( 'public' ) )

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`;
const client = new MongoClient(uri);

let user_collection = null;

async function run() {
	await client.connect();
	user_collection = await client.db("club_pigeon").collection("users");
}

app.use( (req, res, next) => {
	if(user_collection !== null) {
	  next();
	}else{
	  res.status( 503 ).send();
	}
});

app.get('/user/:username', async (req, res) => {
	const username = req.params.username;
	const user = await user_collection.findOne({ username: username });

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(user));
});

app.post('/purchase', (req, res) => {
	let dataString = "";

	req.on('data', function(data) {
	  dataString += data;
	});
  
	req.on('end', async function() {
		let info = JSON.parse(dataString);

	  	const user = await user_collection.findOne({ username: info.username }); //Find user
	  	const purchaseResult = {};

	  	//Determine if transaction is possible
	  	if (user.coins >= info.price && !user.purchasedPuffles.includes(info.puffleName)) {
			user.coins -= info.price;
			user.purchasedPuffles.push(info.puffleName);

			const result = await user_collection.updateOne({ username: info.username }, { $set: { coins: user.coins, purchasedPuffles: user.purchasedPuffles } });
			purchaseResult.status = 1; //Successful purchase
	  	}
	  	else {
			purchaseResult.status = -1; //Unsuccessful purchase
	  	}
	  	purchaseResult.coinsRemaining = user.coins;

	  	res.writeHead(200, { 'Content-Type': 'application/json' });
	  	res.end(JSON.stringify(purchaseResult));
	});
});

app.post('/equip', (req, res) => {
	let dataString = "";

	req.on('data', function(data) {
	  dataString += data;
	});

	req.on('end', async function() {
		let info = JSON.parse(dataString);

		const user = await user_collection.findOne({ username: info.username });

		if (user.purchasedPuffles.includes(info.puffleName)) {
			const result = await user_collection.updateOne({ username: info.username }, { $set: { equippedPuffle: info.puffleName } });
		}
		else {
			const result = await user_collection.updateOne({ username: info.username }, { $set: { equippedPuffle: "" } });
		}

		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ result: "Done" }));
	});
});

run();
server.listen(port, function() {
	console.log(`Express listening on port ${port}`)
})