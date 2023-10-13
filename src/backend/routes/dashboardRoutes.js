import express from "express";
const router = express.Router();

// Import dashboard controller
import {
    getGroupList,
    createGroup,
    deleteGroup,
    getUserByUsername,
    userGroupRef,
} from "../controllers/dashboardController.js";

router.get("/groups", getGroupList);
router.post("/groups", createGroup);
router.delete("/groups/:id", deleteGroup);
router.get("/users/:username", getUserByUsername);
router.post("/addUserGroup", userGroupRef);

export default router;
