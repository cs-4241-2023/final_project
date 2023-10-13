import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const createSecretToken = (userID) => {
  const secretToken = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60, // 1 hour in seconds
  });
  return secretToken;
};

export { createSecretToken };
