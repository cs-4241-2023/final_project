import express from "express";
import {
    getSoloAvailability,
    getSoloAvailabilityByUsername,
    updateSoloAvailability,
    getGroupUserAvailabilities,
    updateGroupUserAvailabilities,
} from "../controllers/gridController.js";
const router = express.Router();

router.get("/users/:username/availability", getSoloAvailabilityByUsername);
router.get("/users/:id/availability", getSoloAvailability);
router.put("/users/:id/availability", updateSoloAvailability);
router.get("/groups/:id/userAvailabilities", getGroupUserAvailabilities);
router.put("/groups/:id/userAvailabilities", updateGroupUserAvailabilities);

export default router;