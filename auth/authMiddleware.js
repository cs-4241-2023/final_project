import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { getConnection } from "../db/dbConnection.js";
import { ObjectId } from "mongodb";

const userVerification = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    // user is not authenticated
    return res
      .status(401)
      .json({ status: false, message: "User not authenticated" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ status: false, message: "User not authenticated" });
    } else {
      const db = await getConnection();
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(decoded.userID) });
      if (!user) {
        return res
          .status(401)
          .json({ status: false, message: "User not authenticated" });
      } else {
        res.json({
          status: true,
          message: "User authenticated successfully",
          user: user.username,
        });
      }
    }
  });
};

export { userVerification };
