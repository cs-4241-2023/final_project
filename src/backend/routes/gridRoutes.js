import express from "express";
import {
    getSoloAvailability,
    updateSoloAvailability,
    getGroupAvailability,
    updateGroupAvailability,
    getSoloAvailabilityByUsername
} from "../controllers/gridController.js";
const router = express.Router();

router.get("/users/:username/availability", getSoloAvailabilityByUsername);
router.get("/users/:id/availability", getSoloAvailability);
router.put("/users/:id/availability", updateSoloAvailability);
router.get("/groups/:id/availability", getGroupAvailability);
router.put("/groups/:id/availability", updateGroupAvailability);

export default router;