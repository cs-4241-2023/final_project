import { ObjectId } from "mongodb";

// Login controller
export const loginUser = async (req, res) => {
    try {
        // Access the database instance using req.db (attached in the middleware)
        const usersCollection = req.db.collection("Users");
        const { username, password } = req.body;

        // Find user within MongoDB
        const user = await usersCollection.findOne({ username });

        if (user !== null && user.password === password) {
            // Successful login
            req.session.user = username;
            res.status(200).end();
        } else {
            // Incorrect username or password
            res.status(401).end();
        }
    } catch (error) {
        console.error("An error occurred during login:", error);
        res.status(500).end();
    }
};

// Signup controller
export const signupUser = async (req, res) => {
    try {
        // Access the database instance using req.db (attached in the middleware)
        const usersCollection = req.db.collection("Users");
        const { username, password } = req.body;

        // Check if the username is already taken
        const existingUser = await usersCollection.findOne({ username });

        if (!existingUser) {
            // Create a new user and associated collection
            await usersCollection.insertOne({
                username,
                password,
                collectionName: username,
            });

            // Create a new collection (if needed) - you can add logic here

            res.status(200).end();
        } else {
            // Username already taken
            res.status(409).end();
        }
    } catch (error) {
        console.error("An error occurred during signup:", error);
        res.status(500).end();
    }
};

// Get users controller
export const getUsers = async (req, res) => {
    try {
        // Access the database instance using req.db (attached in the middleware)
        const usersCollection = req.db.collection("Users");
        const users = await usersCollection.find().toArray();

        res.status(200).json(users);
    } catch (error) {
        console.error("An error occurred while fetching users:", error);
        res.status(500).end();
    }
};

// Other login-related controllers can be added here if needed
