import Profile from "../models/Profile.js";
import fs from "fs";

// ✅ CREATE Profile
export const createProfile = async (req, res) => {
  try {
    const {
      name,
      businessName,
      businessCategories,
      headQuarters,
      foundedIn,
      website,
      bio,
      businessDetails,
      gstin,
      panNumber,
      businessAddress,
      postalCode,
    } = req.body;

    const profileImage = req.file ? req.file.path : null;

    const profile = await Profile.create({
      name,
      businessName,
      businessCategories,
      headQuarters,
      foundedIn,
      website,
      bio,
      businessDetails,
      gstin,
      panNumber,
      businessAddress,
      postalCode,
      profileImage,
    });

    res.status(201).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ GET All Profiles
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll();

    res.json({
      success: true,
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ GET Profile By ID
export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ UPDATE Profile
export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Delete old image if new one uploaded
    if (req.file && profile.profileImage) {
      fs.unlinkSync(profile.profileImage);
    }

    const updatedData = {
      ...req.body,
    };

    if (req.file) {
      updatedData.profileImage = req.file.path;
    }

    await profile.update(updatedData);

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ DELETE Profile
export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Delete image from folder
    if (profile.profileImage) {
      fs.unlinkSync(profile.profileImage);
    }

    await profile.destroy();

    res.json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};