import express from "express";
const router = express.Router();

import {authStatus, loginUser, signupUser, unAuthorize} from "../controllers/loginController.js";

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/unAuth", unAuthorize);
router.get("/auth", authStatus);

export default router;