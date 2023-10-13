import express from "express";
import {updateAvailability, getUserAvailability} from "../controllers/gridController.js";
const router = express.Router();

router.post("/send-availability", updateAvailability);
router.get("/users/:id/availability", getUserAvailability);

export default router;