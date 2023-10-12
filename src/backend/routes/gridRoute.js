import express from "express";
import {updateAvailability} from "../controllers/gridController.js";
const router = express.Router();

router.post("/send-availability", updateAvailability);

export default router;