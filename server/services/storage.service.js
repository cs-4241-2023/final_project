const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASS;
const host = process.env.MONGODB_HOST;
const db_name = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${user}:${password}@${host}/test?retryWrites=true&w=majority`;

class StorageService {
    constructor() {
        this.client = new MongoClient(uri);
        this.client.connect().catch(err => {
            console.error('Failed to connect to MongoDB', err);
        });
    }

    async createUser(username, hashedPassword) {
        const db = this.client.db(db_name);
        const result = await db.collection('users').insertOne({ username, hashedPassword });
        if (!result.insertedId) {
            throw new Error('User creation failed');
        }
        return {
            _id: result.insertedId,
            username,
            hashedPassword,
        };
    }

    async findUserByUsername(username) {
        const db = this.client.db(db_name);
        const user = await db.collection('users').findOne({ username });
        return user;
    }

    async findUserById(id) {
        const db = this.client.db(db_name);
        const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
        return user;
    }
}

module.exports = { storageService: new StorageService() };
