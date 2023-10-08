import express from "express";
const router = express.Router();

import { loginUser, signupUser, getUsers } from "../controllers/loginController.js";

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/get-users", getUsers);

export default router;
