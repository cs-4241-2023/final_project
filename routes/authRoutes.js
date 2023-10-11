import { SignUp } from "../auth/authControllers.js";
import express from "express";
const router = express.Router();

router.post("/signup", SignUp);

export default router;
