import express from "express";
import * as userController from "../controllers/userProfileController";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUserWithProfiles);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
