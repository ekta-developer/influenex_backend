import Banner from "../models/Banner.js";
import multer from "multer";
import path from "path";
import fs from "fs";

/* ================= CREATE BANNER FOLDER ================= */

const bannerDir = "uploads/banners";

if (!fs.existsSync(bannerDir)) {
  fs.mkdirSync(bannerDir, { recursive: true });
}

/* ================= MULTER STORAGE ================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, bannerDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const uploadBanner = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

/* ================= CREATE BANNER ================= */

export const createBanner = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path : null;

    if (!imagePath) {
      return res.status(400).json({
        success: false,
        message: "Banner image is required",
      });
    }

    const banner = await Banner.create({
      image: imagePath,
    });

    res.status(201).json({
      response: {
        success: true,
        message: "Banner uploaded Successfully",
        ...banner.dataValues,
      },
    });
  } catch (error) {
    res.status(500).json({
      response: {
        success: false,
        message: error.message,
      },
    });
  }
};

/* ================= GET ALL BANNERS ================= */

export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll({
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ================= GET SINGLE BANNER ================= */

export const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ================= UPDATE BANNER ================= */

export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    /* DELETE OLD IMAGE IF NEW IMAGE UPLOADED */

    if (req.file && banner.image) {
      if (fs.existsSync(banner.image)) {
        fs.unlinkSync(banner.image);
      }

      banner.image = req.file.path;
    }

    await banner.save();

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ================= DELETE BANNER ================= */

export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    /* DELETE IMAGE FILE */

    if (banner.image && fs.existsSync(banner.image)) {
      fs.unlinkSync(banner.image);
    }

    await banner.destroy();

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
