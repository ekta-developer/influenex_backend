import express from "express";
import upload from "../middleware/ProfileUpload.js";
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} from "../controller/ProfileController.js";

const router = express.Router();

// Create Profile
router.post("/", upload.single("profileImage"), createProfile);

// Get All
router.get("/", getAllProfiles);

// Get By ID
router.get("/:id", getProfileById);

// Update
router.put("/:id", upload.single("profileImage"), updateProfile);

// Delete
router.delete("/:id", deleteProfile);

export default router;