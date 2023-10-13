import User from "../models/User.js";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']
const initialAvailability = days.reduce((availability, day) => {
    availability[day] = {};

    times.forEach((time) => {
        availability[day][time] = false; // Initialize to false for each day and time slot
    });

    return availability;
}, {});

// Login controller
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if ((user && password === user.password) || req.session.isLoggedIn) {
            req.session.user = username;
            req.session.isLoggedIn = true;

            const id = { userID: user._id.toString() };

            res.status(200).json(id);
        } else {
            req.session.user = undefined;
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
            const newUser = new User({
                username,
                password,
                groups: [],
                availability: initialAvailability
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
    if (req.session.isLoggedIn) {
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