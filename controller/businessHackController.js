import BusinessHack from "../models/BusinessHacks.js";

// ✅ CREATE
export const createBusinessHack = async (req, res) => {
  try {
    const { campaignName, state, city, campaignType } = req.body;

    const newCampaign = await BusinessHack.create({
      campaignName,
      state,
      city,
      campaignType,
    });

    res.status(201).json({
      success: true,
      message: "Campaign created successfully",
      data: newCampaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ GET ALL
export const getAllBusinessHacks = async (req, res) => {
  try {
    const campaigns = await BusinessHack.findAll({
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: campaigns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ GET SINGLE
export const getBusinessHackById = async (req, res) => {
  try {
    const campaign = await BusinessHack.findByPk(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    res.status(200).json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ UPDATE
export const updateBusinessHack = async (req, res) => {
  try {
    const campaign = await BusinessHack.findByPk(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    const { campaignName, state, city, campaignType } = req.body;

    campaign.campaignName = campaignName ?? campaign.campaignName;
    campaign.state = state ?? campaign.state;
    campaign.city = city ?? campaign.city;
    campaign.campaignType = campaignType ?? campaign.campaignType;

    await campaign.save();

    res.status(200).json({
      success: true,
      message: "Campaign updated successfully",
      data: campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ DELETE
export const deleteBusinessHack = async (req, res) => {
  try {
    const campaign = await BusinessHack.findByPk(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    await campaign.destroy();

    res.status(200).json({
      success: true,
      message: "Campaign deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};