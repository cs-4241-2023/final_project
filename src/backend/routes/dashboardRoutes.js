import express from "express";
const router = express.Router();

// Import dashboard controller
import {getGroupList, addGroup, deleteGroup, lookupUser, userGroupRef} from "../controllers/dashboardController.js";

router.get("/groups", getGroupList);
router.post("/groups", addGroup);
router.delete("/groups/:id", deleteGroup);
router.post("/users", lookupUser);
router.post("/addUserGroup", userGroupRef);

export default router;
