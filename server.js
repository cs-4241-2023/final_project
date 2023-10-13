import express from 'express'
import ViteExpress from 'vite-express'
import bcrypt from 'bcrypt';
import {User} from './src/models/userModel.js';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let currentUser = "";

import session from 'express-session'

const PORT = process.env.PORT || 3000;
dotenv.config();




const app = express()

// const uri = "mongodb+srv://Emre:webware@database1.jtophzn.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
const uri = "mongodb+srv://Emre:webware@database1.jtophzn.mongodb.net/live25";

let collection = null;
let un = '' //init username
let userCollection = null; 
async function run() {
  try {
    await mongoose.connect(uri, { useUnifiedTopology: true });
    const db = mongoose.connection;
    collection = db.collection("live25");
    userCollection=db.collection('users')
    // route to get all docs
    app.get("/docs", async (req, res) => {
      if (collection !== null) {
        const docs = await collection.find({}).toArray();
        res.json(docs);
      }
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run();

const saltRounds = 10;

app.use( express.json() )
app.use( express.static( 'public' ) )
app.use(express.static(path.join(__dirname, 'build')));
app.use( express.json() )


// use express.urlencoded to get data sent by default form actions
app.use(express.urlencoded({ extended: true }));


app.get('/event', (req, res) => res.json(/* */));
app.get('/', (req,res)=> {
  res.json({
    message: 'success'
  })
})


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    un = user.username

    if (!user) return res.status(400).json({ message: 'user not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'invalid password' });
    if (isMatch) { //new
    currentUser = username;
    return res.json({ message: 'Logged in successfully', username: username });
}
   
    
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'user already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ username, password: hashedPassword });

        await newUser.save();
        res.json({ message: 'registration successful' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user' });
    }
})


//enter calendar event data into DB
app.post( '/submit', async (req,res) => {
  
  try {
    const newItem = req.body;
    newItem.username = un 
    console.log(un)
    

    const existingItem = await collection.findOne(newItem)
    if (existingItem) {
      return res.status(409).json({message: "Duplicate entry. "})
    }

    const result = await collection.insertOne(newItem)
  

    res.status(200).json({ message: 'Data added to MongoDB', result })
  } catch (error) {
    console.error('Error adding data to MongoDB:', error)
    res.status(500).json({ message: 'Failed to add data to MongoDB' })
  }
}) 

//delete event from calendar in DB
app.post("/remove", async (req, res) => {
  //console.log(req.params.id)
  try {
    const result = await collection.deleteOne({"id": req.body.id});
    if (result.deletedCount === 1) {
      console.log('Deleted event with ID:', req.params.id);
      const newList = await collection.find({ username: currentUser }).toArray();
      res.status(200).json(newList); // Send updated events list
    } else {
      // Event with the specified ID was not found
      console.log('Event not found with ID:', req.params.id)
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error('Error while deleting event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/update', async (req, res) => {
  const updatedEvent = {
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
  };

  try {
    const result = await collection.updateOne(
      { id: req.body.id }, // Use id as a string
      {
        $set: {
          title: updatedEvent.title,
          start: updatedEvent.start,
          end: updatedEvent.end,
        },
      }
    );

    if (result.matchedCount === 1 && result.modifiedCount === 1) {
      console.log('Event updated successfully.');
      res.status(200).json({ message: 'Event updated successfully' });
    } else {
      console.log('Event not found or not updated.');
      res.status(404).json({ error: 'Event not found or not updated' });
    }
  } catch (error) {
    console.error('Error while updating event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/docs/:username', async (req, res) => {
    if (collection !== null) {
        const docs = await collection.find({username: req.params.username}).toArray();
        res.json(docs);
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



ViteExpress.listen( app, PORT )

