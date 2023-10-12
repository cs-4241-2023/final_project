const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rtn4ey0.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Weather APP DB Successfully connected to the DB!");
    } catch (error) {
        console.error("Failed to connect to the DB:", error);
        throw error;
    }
}

module.exports = {
    client,
    connectToDatabase
};
