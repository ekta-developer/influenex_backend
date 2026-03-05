import Influencer from "../models/InfluencerUser.js";

// ✅ CREATE Influencer
export const createInfluencer = async (req, res) => {
  try {
    const influencer = await Influencer.create(req.body);

    res.status(201).json({
      success: true,
      data: influencer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ GET All Influencers
export const getAllInfluencers = async (req, res) => {
  try {
    const influencers = await Influencer.findAll();

    res.status(200).json({
      success: true,
      data: influencers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ GET Influencer by ID
export const getInfluencerById = async (req, res) => {
  try {
    const influencer = await Influencer.findByPk(req.params.id);

    if (!influencer) {
      return res.status(404).json({
        success: false,
        message: "Influencer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: influencer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ UPDATE Influencer
export const updateInfluencer = async (req, res) => {
  try {
    const influencer = await Influencer.findByPk(req.params.id);

    if (!influencer) {
      return res.status(404).json({
        success: false,
        message: "Influencer not found",
      });
    }

    await influencer.update(req.body);

    res.status(200).json({
      success: true,
      data: influencer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ DELETE Influencer
export const deleteInfluencer = async (req, res) => {
  try {
    const influencer = await Influencer.findByPk(req.params.id);

    if (!influencer) {
      return res.status(404).json({
        success: false,
        message: "Influencer not found",
      });
    }

    await influencer.destroy();

    res.status(200).json({
      success: true,
      message: "Influencer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
