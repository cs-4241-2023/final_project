import bcrypt from "bcrypt";
import User from "../models/User.js";

// Login controller
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if ((user && password === user.password) || req.session.isLoggedIn) {
            req.session.user = username;
            req.session.isLoggedIn = true;
            res.status(200).end();
        } else {
            req.session.isLoggedIn = false;
            res.status(401).end();
        }
    } catch (error) {
        console.error("An error occurred during login:", error);
        res.status(500).end();
    }
};

export const signupUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            // const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = new User({
                username,
                password
            });

            await newUser.save();

            res.status(200).end();
        } else {
            res.status(409).end();
        }
    } catch (error) {
        console.error("An error occurred during signup:", error);
        res.status(501).end();
    }
};

export const authStatus = (req, res) => {
    console.log(req.session.isLoggedIn)
    if(req.session.isLoggedIn) {
        res.status(200).end();
    } else {
        res.status(401).end();
    }
}

export const unAuthorize = (req, res) => {
    req.session.isLoggedIn = false;
    res.status(200).end();
}

// export const getUsers = async (req, res) => {
//     try {
//         const users = await User.find();

//         res.status(200).json(users);
//     } catch (error) {
//         console.error("An error occurred while fetching users:", error);
//         res.status(500).end();
//     }
// };