import express from "express";
const router = express.Router();

// Import dashboard controller
import { getGroupList, addGroup, deleteGroup } from "../controllers/dashboardController.js";

router.get("/groups", getGroupList);
router.post("/add-group", addGroup);
router.delete("/delete-group", deleteGroup);

export default router;
