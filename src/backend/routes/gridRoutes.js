import express from "express";
import {updateAvailability, getUserAvailability, updateUserAvailability} from "../controllers/gridController.js";
const router = express.Router();

router.post("/send-availability", updateAvailability);
router.get("/users/:id/availability", getUserAvailability);
router.put("/users/:id/availability", updateUserAvailability);

export default router;