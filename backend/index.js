const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { useDeferredValue } = require('react')
const Schema = mongoose.Schema

app.use(cors())
app.use(express.json())

const user = new Schema({
    username: String,
    password: String
}, {collection: 'WhatsTheDeal'})

const dealData = new Schema({
    value: String,
    info: String,
    location: String,
    start: String,
    end: String,
    restaurant: String
}, {collection: 'WhatsTheDealDeals'})

const Person = new mongoose.model("Ethan", user);
const Deal = new mongoose.model("Deals",dealData);


app.post("/insert", (req, res) => {
    let connection = dbConnect();
    connection.then(() => {
        let user = req.body;
        insertUser(user, res)
    })
})

app.post("/delete", (req, res) => {
    let connection = dbConnect();
    connection.then(() => {
        console.log(req.body)
        let data = req.body;
        deleteUser(data, res)
    })
})

app.post("/validate", (req, res) => {
    let connection = dbConnect();
    connection.then(() => {
        let user = req.body;
        validateUser(user, res);
    })
})
app.get("/dealData", (req, res) => {
    let connection = dbConnect();
    connection.then(() => {
        getDealInfo(res);
    })
})
app.post("/addDeal", (req, res) => {
    let connection = dbConnect();
    connection.then(() => {
        let deal = req.body;
        addDeal(deal, res)
    })
})

app.post("/deleteDeal", (req, res) => {
    let connection = dbConnect();
    connection.then(() => {
        let deal = req.body;
        deleteDeal(deal, res);
    })
})

async function insertUser(user, res){
    let u = await Person.find({username: user.username, password: user.password})
    if(u.length === 0){ // if the user already exists in the database
        let person = new Person({
            username: user.username,
            password: user.password
        });
        await person.save()
        res.writeHead(200, "OK", {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"}) 
        console.log(`Inserted user ${JSON.stringify(user)} into WhatsTheDeal`)
        res.write(JSON.stringify(user));
    }
    else{
        res.writeHead(400);
        res.end("Error: user already exists")
    }
}

async function deleteUser(user, res){
    await Person.findOneAndDelete({username: user.username, password: user.password}).then(deletedDoc => {
        if(deletedDoc){
            res.writeHead(200, "OK", {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"}) 
            console.log(`Deleted user ${JSON.stringify(user)} from WhatsTheDeal`)
            res.write(JSON.stringify(user));
        }
        else{
            res.writeHead(400)
            res.end("Error: this document does not exist in the database")
        }
    })
}

async function validateUser(user, res){
    let u = await Person.find({username: user.username, password: user.password})
    if(u.length !== 0){
        console.log("user found" + JSON.stringify(user))
        await res.writeHead(200, "OK", {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"})
        await res.write(JSON.stringify(user))
    }
    else{
        console.log("user not found" + JSON.stringify(user))
        await res.writeHead(400);
        await res.end("Error: this user does not exist in the database");
    }
    
}

async function addDeal(deal, res){
    let d = await Deal.find({value: deal.value, info: deal.info, location: deal.location, start: deal.start, end: deal.end, restaurant: deal.restaurant})
    console.log(d);
        if(d.length === 0){
        let newDeal = new Deal({
            value: deal.value,
            info: deal.info,
            location: deal.location,
            start: deal.start,
            end: deal.end,
            restaurant: deal.restaurant
        })
        console.log("newdeal" + newDeal)
        await newDeal.save();
        await res.writeHead(200, "OK", {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"})
        await res.write(JSON.stringify(newDeal))
    }
    else{
        await res.writeHead(400)
        await res.write("Error: Deal already exists in database");
    }
}

async function deleteDeal(deal, res){
    await Deal.findOneAndDelete({value: deal.value, info: deal.info, location: deal.location, start: deal.start, end: deal.end, restaurant: deal.restaurant}).then(deletedDoc => {
        if(deletedDoc){
            res.writeHead(200, "OK", {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"}) 
            console.log(`Deleted user ${JSON.stringify(user)} from WhatsTheDeal`)
            res.write(JSON.stringify(deal));
        }
        else{
            res.writeHead(400)
            res.end("Error: this document does not exist in the database")
        }
    })
}

async function getDealInfo(res){
    let dealList = await Deal.find({});
    if(dealList !== 0){
        console.log(dealList);
        res.writeHead(200, "OK", {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"});
        let strDealList = JSON.stringify(dealList);
        res.end(strDealList);


    }else {
        console.log("No Deals Found");
        await res.writeHead(400);
        await res.end("Error:No deals in database");
    }

}

async function dbConnect(){
   try {
    let goose = await mongoose.connect('mongodb+srv://tuckeremmette:KF53pGOy1jk6ndka@trcluster.yvdst08.mongodb.net/webwareProjects?retryWrites=true&w=majority');
    return goose;
  } catch (error) {
    console.log(error);
}}

console.log("Server running at port 2048")
app.listen(2048);