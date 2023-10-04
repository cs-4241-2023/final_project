const express = require("express");
const fs = require("fs");
const mime = require('mime');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const PORT = 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(process.env.DB_CONNECTION);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("WhatsTheDeal").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// This runs the connection to the database
run().catch(console.dir);

app.get("/", (req, res) => {
    sendFile(res, "./pages/login.html");
})

app.get("/login.html", (req, res) =>{
    sendFile(res, "./pages/login.html");
})

const sendFile = function( response, filename ) {
    const type = mime.getType( filename )
 
    fs.readFile( filename, function( err, content ) {
 
      // if the error = null, then we've loaded the file successfully
      if( err === null ) {
 
        // status code: https://httpstatuses.com
        response.writeHeader( 200, { 'Content-Type': type })
        response.end( content )
 
      }else{
 
        // file not found, error code 404
        response.writeHeader( 404 )
        response.end( '404 Error: File Not Found' + err )
 
      }
    })
 }

app.listen(PORT)