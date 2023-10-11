import { SignUp, Login } from "../auth/authControllers.js";
import { userVerification } from "../auth/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/", userVerification);

export default router;
