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

export { SignUp };
