import { createSecretToken } from "./SecretToken.js";
import { getConnection } from "../db/dbConnection.js";

const SignUp = async (req, res) => {
  const { username, password } = req.body;
  const db = await getConnection();
  const user = await db.collection("users").findOne({ username });
  if (user) {
    // user with the same username already exists
    return res.status(409).json({ message: "Username already taken" });
  }
  // create a new user in the database
  const result = await db.collection("users").insertOne({ username, password });
  if (!result.insertedId) {
    // failed to create user in the database
    return res.status(500).json({ message: "Failed to create user" });
  }
  // user registration successful
  const token = createSecretToken(result.insertedId);
  res.cookie("token", token, {
    withCredentials: true,
    httpOnly: false,
  });
  return res.status(201).json({ message: "User registered successfully" });
};

const Login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    // username or password is missing
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const db = await getConnection();
  const user = await db.collection("users").findOne({ username, password });
  if (!user) {
    // user with the given username and password not found
    return res.status(401).json({ message: "Invalid username or password" });
  }
  // user authentication successful
  const token = createSecretToken(user._id);
  res.cookie("token", token, {
    withCredentials: true,
    httpOnly: false,
  });
  return res.status(200).json({ message: "User authenticated successfully" });
};

export { SignUp, Login };
