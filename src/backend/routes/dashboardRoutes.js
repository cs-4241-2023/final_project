import express from "express";
const router = express.Router();

// Import dashboard controller
import { getGroupList, addGroup, deleteGroup } from "../controllers/dashboardController.js";

router.get("/groups", getGroupList);
router.post("/groups", addGroup);
router.delete("/groups/:id", deleteGroup);

export default router;
