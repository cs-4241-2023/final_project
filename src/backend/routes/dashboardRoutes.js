import express from "express";
const router = express.Router();

// Import dashboard controller
import { getGroups, addGroup, deleteGroup } from "../controllers/dashboardController.js";

// Dashboard route to retrieve data
router.post("/get-collection", getGroups);

// Add a new group route
router.post("/add-group", addGroup);

// Delete a group route
router.delete("/delete-group", deleteGroup);

export default router;
