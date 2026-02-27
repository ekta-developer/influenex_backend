import BusinessHackStep4 from "../models/BusinessHackStep4.js";
import BusinessHack from "../models/BusinessHacks.js";
import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure folders exist
const campaignDir = "uploads/campaign-images";
const sampleDir = "uploads/sample-media";

if (!fs.existsSync(campaignDir)) {
  fs.mkdirSync(campaignDir, { recursive: true });
}

if (!fs.existsSync(sampleDir)) {
  fs.mkdirSync(sampleDir, { recursive: true });
}

// Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "campaignImage") {
      cb(null, campaignDir);
    } else if (file.fieldname === "sampleMedia") {
      cb(null, sampleDir);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadMedia = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([
  { name: "campaignImage", maxCount: 1 },
  { name: "sampleMedia", maxCount: 10 },
]);


// ✅ CREATE
export const createBusinessHackStep4 = async (req, res) => {
  try {
    const { businessHackId } = req.body;

    const campaign = await BusinessHack.findByPk(businessHackId);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Business Hack not found",
      });
    }

    const campaignImage = req.files?.campaignImage
      ? req.files.campaignImage[0].path
      : null;

    const sampleMedia = req.files?.sampleMedia
      ? req.files.sampleMedia.map(file => file.path)
      : [];

    const step4 = await BusinessHackStep4.create({
      businessHackId,
      campaignImage,
      sampleMedia,
    });

    res.status(201).json({
      success: true,
      message: "Step-4 Media uploaded successfully",
      data: step4,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// ✅ GET ALL
export const getAllBusinessHackStep4 = async (req, res) => {
  try {
    const data = await BusinessHackStep4.findAll({
      include: BusinessHack,
    });

    res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// ✅ UPDATE
export const updateBusinessHackStep4 = async (req, res) => {
  try {
    const step4 = await BusinessHackStep4.findByPk(req.params.id);

    if (!step4) {
      return res.status(404).json({
        success: false,
        message: "Step-4 not found",
      });
    }

    // Delete old files if new uploaded
    if (req.files?.campaignImage && step4.campaignImage) {
      if (fs.existsSync(step4.campaignImage)) {
        fs.unlinkSync(step4.campaignImage);
      }
      step4.campaignImage = req.files.campaignImage[0].path;
    }

    if (req.files?.sampleMedia) {
      // delete old sample media
      if (step4.sampleMedia) {
        step4.sampleMedia.forEach(file => {
          if (fs.existsSync(file)) {
            fs.unlinkSync(file);
          }
        });
      }
      step4.sampleMedia = req.files.sampleMedia.map(file => file.path);
    }

    await step4.save();

    res.status(200).json({
      success: true,
      message: "Step-4 Media updated successfully",
      data: step4,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// ✅ DELETE
export const deleteBusinessHackStep4 = async (req, res) => {
  try {
    const step4 = await BusinessHackStep4.findByPk(req.params.id);

    if (!step4) {
      return res.status(404).json({
        success: false,
        message: "Step-4 not found",
      });
    }

    // delete files
    if (step4.campaignImage && fs.existsSync(step4.campaignImage)) {
      fs.unlinkSync(step4.campaignImage);
    }

    if (step4.sampleMedia) {
      step4.sampleMedia.forEach(file => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });
    }

    await step4.destroy();

    res.status(200).json({
      success: true,
      message: "Step-4 deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};