import express from "express";
import upload from "../middleware/ProfileUpload.js";
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} from "../controller/ProfileController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Create Profile
router.post("/", upload.single("profileImage"), verifyToken, createProfile);

// Get All
router.get("/",verifyToken, getAllProfiles);

// Get By ID
router.get("/:id",verifyToken, getProfileById);

// Update
router.put("/:id", upload.single("profileImage"),verifyToken, updateProfile);

// Delete
router.delete("/:id",verifyToken, deleteProfile);

export default router;