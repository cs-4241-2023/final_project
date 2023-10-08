import express from "express";
const router = express.Router();

// Import dashboard controller
import { getCollection, addGroup, deleteGroup } from "../controllers/dashboardController.js";

// Dashboard route to retrieve data
router.post("/get-collection", getCollection);

// Add a new group route
router.post("/add-group", addGroup);

// Delete a group route
router.delete("/delete-group", deleteGroup);

export default router;
