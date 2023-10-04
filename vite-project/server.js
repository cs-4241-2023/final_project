import express from  'express'
import ViteExpress from 'vite-express'
import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
import cookieSession from 'cookie-session'
import bcrypt from 'bcryptjs'

dotenv.config()

//Build system Vite will handle static routes (GET requests) for us.
const app = express()
app.use(express.json())

app.use(cookieSession({
  name: 'session', //the name of the cookie to set
  keys: ['key1', 'key2'] //The list of keys to use to sign & verify cookie values. Set cookies are always signed with keys[0], while the other keys are valid for verification, allowing for key rotation.
}))

//Application data structure:

/*
const user = {username: 'john', password: 'pw', 
musictour: {tourname: 'Judgement Day', 
tourduration: 50, 
tourlocations: [{country: 'US', state: 'New York', venue: 'Madison Square Garden', date: '12-20-2023'}],
targetaudiences: [{agerange: '15-30', favoritegenres: ['Rock', 'Pop']}],
headliningartists: [{artist: 'Limp Bizkit', setlist: ['My Generation', 'Counterfeit']}],
supportingartists: [{artist: 'Taylor Swift', setlist: ['Love Story', 'You Belong With Me']}]}}
*/

//Client-side rendered application using React. Server only functions to interact with the client via HTTP protocal.

let userData = {}

//MongoDB Connection

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
const client = new MongoClient(uri)

let collection = null

async function run() { 
  await client.connect()
  collection = await client.db("FantasyMusicTourBuilderData").collection("FantasyMusicToursPerUser")
}
run()

app.use((req, res, next) => { 
  if(collection !== null) {
    console.log("Collection has been assigned.")
    next() //The next() function is a function in the Express router that, when invoked, executes the next middleware in the middleware stack. If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
  }else{
    console.log("Collection is null.") //Middleware stack stops at this point
  }
})

app.post('/userCreation', async (req, res) => {

})

app.post('/userLogin', async (req, res) => {
  
})

ViteExpress.listen(app, 3000)