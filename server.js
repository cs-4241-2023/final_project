import express from 'express'
import {MongoClient, ObjectId} from 'mongodb'
import ViteExpress from 'vite-express'

const app = express()

app.use(express.json())

process.env.USER
process.env.PASS
const url = `mongodb+srv://${process.env.USER}:${process.env.PASS}@final-project.xxvsnti.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient( url )

let collection = null

async function run() {
  await client.connect()
  collection = await client.db("Bitcoin-Clicker").collection("Accounts")
}

run()

app.use( (req,res,next) => {
  if( collection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})

app.post( '/save', async ( req,res ) => {
  const result = await collection.updateOne(
    { user: { $eq: req.body.user } }, 
    {$set: {clicks: req.body.clicks, clickMultiplier: req.body.clickMultiplier, upgrades: req.body.upgrades, autoclickers: req.body.autoclickers, mapAutoclickers: req.body.mapAutoclickers}})
  res.json( true )
})

app.post( '/load', async ( req,res ) => {
  const account = await collection.find({ user: { $eq: req.body.user } }).toArray()
  res.json( account[0] )
})

app.post( '/login', async ( req,res ) => {
  const result = null
  const account = await collection.find({ user: { $eq: req.body.user } }).toArray()
  if (account.length == 0) {
    res.json( false )
  } else {
    if (account[0].pass == req.body.pass) {
      res.json( true )
    } else {
      res.json( false )
    }
  }  
})

app.post( '/createAccount', async ( req,res ) => {
  const account = await collection.find({ user: { $eq: req.body.user } }).toArray()
  console.log(account)
  if (account.length == 0) {
    const result = await collection.insertOne(req.body)
    res.json( true )
  } else {
    res.json( false )
  }
})

app.post( '/deleteAccount', async ( req,res ) => {
  const account = await collection.find({ user: { $eq: req.body.user } }).toArray()
  if (account[0].pass == req.body.pass) {
    const result = await collection.deleteOne({ user: { $eq: req.body.user } })
    res.json( true )
  } else {
    res.json( false )
  }
})

ViteExpress.listen( app, 3000 )