import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

// MongoDB connection setup
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db = null;

async function connectToDB() {
  await client.connect();
  db = await client.db("Spelling_Goat_App");
  console.log("Connected to DB successfully");
}

// connectToDB().catch((error) => {
//   console.error("Error connecting to the database: ", error);
// });

const getConnection = async () => {
  if (db) {
    return db;
  } else {
    await connectToDB().catch((error) => {
      console.error("Error connecting to the database: ", error);
    });
    return db;
  }
};

export { getConnection };
