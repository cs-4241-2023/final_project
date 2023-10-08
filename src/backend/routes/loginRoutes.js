import express from "express";
const router = express.Router();

// Import login controller
import { loginUser, signupUser, getUsers } from "../controllers/loginController.js";

// Login route
router.post("/login", loginUser);

// Signup route
router.post("/signup", signupUser);

// Get users route
router.get("/get-users", getUsers);

export default router;
