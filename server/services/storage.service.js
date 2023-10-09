const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const clusterUrl = process.env.MONGODB_URL;
const db_name = process.env.MONGODB_DB_NAME;
let uri;

if (process.env.MONGODB_x509_CERT) {
    const clientPEMFile = encodeURIComponent(process.env.MONGODB_x509_CERT);
    const authMechanism = "MONGODB-X509";
    uri =
        `mongodb+srv://${clusterUrl}/?authMechanism=${authMechanism}&tls=true&tlsCertificateKeyFile=${clientPEMFile}`;
}
else {
    const username = encodeURIComponent(process.env.MONGODB_USER);
    const password = encodeURIComponent(process.env.MONGODB_PASS);
    const authMechanism = "DEFAULT";
    uri =
        `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;
}

class StorageService {
    Collection = {
        USER: "users",
        CHARACTERS: "characters"
    }

    constructor() {
        this.client = new MongoClient(uri);
        this.client.connect().catch(err => {
            console.error('Failed to connect to MongoDB', err);
        });
    }

    async createUser(username, hashedPassword, firstName, lastName) {
        const db = this.client.db(db_name);
        const result = await db.collection(
            this.Collection.USER
        ).insertOne({
            username,
            hashedPassword,
            firstName,
            lastName,
        });
        if (!result.insertedId) {
            throw new Error('User creation failed');
        }
        return {
            _id: result.insertedId,
            username,
            hashedPassword,
            firstName,
            lastName,
        };
    }

    async findUserByUsername(username) {
        const db = this.client.db(db_name);
        const user = await db.collection(
            this.Collection.USER
        ).findOne({
            username
        });
        return user;
    }

    async findUserById(id) {
        const db = this.client.db(db_name);
        const user = await db.collection(
            this.Collection.USER
        ).findOne({
            _id: new ObjectId(id)
        });
        return user;
    }

    async saveCharacter(username, color, face, hat, shirt, name, skills, food, slogan) {
        const db = this.client.db(db_name);
        const result = await db.collection(
            this.Collection.CHARACTERS
        ).insertOne({
            username,
            color,
            face,
            hat,
            shirt,
            name,
            skills,
            food,
            slogan
        });
        if (!result.insertedId) {
            throw new Error('Saving character failed');
        }
        return {
            _id: result.insertedId,
            username,
            color,
            face,
            hat,
            shirt,
            name,
            skills,
            food,
            slogan
        };
    }

    async updateCharacter(_id, username, color, face, hat, shirt, name, skills, food, slogan) {
        const db = this.client.db(db_name);
        const result = await db.collection(
            this.Collection.CHARACTERS
        ).updateOne(
            {_id: new ObjectId(_id)},
            {
                "$set": {
                    username,
                    color,
                    face,
                    hat,
                    shirt,
                    name,
                    skills,
                    food,
                    slogan
                }
            }
        );
        return {
            _id,
            username,
            color,
            face,
            hat,
            shirt,
            name,
            skills,
            food,
            slogan
        };
    }

    async deleteCharacter(id) {
        const db = this.client.db(db_name);
        const result = await db.collection(
            this.Collection.CHARACTERS
        ).deleteOne({
            _id: new ObjectId(id)
        });
        if (!result.deletedCount) {
            throw new Error('Deleting character failed');
        }
        return {
            _id: result.deletedCount,
        };
    }
}

module.exports = { storageService: new StorageService() };
