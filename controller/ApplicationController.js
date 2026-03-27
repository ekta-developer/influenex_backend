import Application from "../models/Application.js";

/**
 * @desc    Influencer applies to a campaign
 * @route   POST /api/applications
 * @access  Influencer (Protected)
 */
export const applyToCampaign = async (req, res) => {
  try {
    const { campaignId, pitchMessage, expectedRate } = req.body;

    const user = req.user;
console.log(user,"kjwdcjwbcwbvh");

    // ✅ STEP 1: Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found in token",
      });
    }

    // ✅ STEP 2: ROLE CHECK FIRST (VERY IMPORTANT)
    if (user.userType !== "influencer") {
      return res.status(403).json({
        success: false,
        message:
          "You are logged in as Brand. Only Influencers are allowed to apply to campaigns.",
      });
    }

    // ✅ STEP 3: Now safely use influencerId
    const influencerId = user.userId;

    // Extra safety check
    if (!influencerId) {
      return res.status(400).json({
        success: false,
        message: "Invalid user token: influencer ID missing",
      });
    }

    // 🔍 Check duplicate
    const existing = await Application.findOne({
      where: {
        campaign_id: campaignId,
        influencer_id: influencerId,
      },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this campaign",
      });
    }

    // 📝 Create application
    const application = await Application.create({
      campaign_id: campaignId,
      influencer_id: influencerId,
      brand_id: req.body.brandId,
      pitch_message: pitchMessage,
      expected_rate: expectedRate,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });

  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get all applications of logged-in influencer
 * @route   GET /api/applications/my
 * @access  Influencer (Protected)
 */
export const getMyApplications = async (req, res) => {
  try {
    // Get influencer ID from token
    const influencerId = req.user.userId;

    // Fetch all applications created by this influencer
    const applications = await Application.findAll({
      where: { influencer_id: influencerId },
      order: [["createdAt", "DESC"]], // Latest first
    });

    res.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get all applications for a specific campaign
 * @route   GET /api/applications/campaign/:campaignId
 * @access  Brand (Protected)
 */
export const getApplicationsByCampaign = async (req, res) => {
  try {
    // Extract campaign ID from URL params
    const { campaignId } = req.params;

    // Fetch all applications for this campaign
    const applications = await Application.findAll({
      where: { campaign_id: campaignId },
    });

    res.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import Deal from "../models/Deal.js";
import sequelize from "../config/database.js";

/**
 * @desc    Brand accepts an application and creates a deal
 * @route   POST /api/applications/:id/accept
 * @access  Brand (Protected)
 */
export const acceptApplication = async (req, res) => {
  // Start DB transaction (important for data consistency)
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    // 🔍 Find application by ID
    const application = await Application.findByPk(id, {
      transaction,
    });

    // If application not found
    if (!application) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // ✅ Update application status to accepted
    application.status = "accepted";
    await application.save({ transaction });

    // 🤝 Create deal based on accepted application
    const deal = await Deal.create(
      {
        campaign_id: application.campaign_id,
        application_id: application.id,
        influencer_id: application.influencer_id,
        brand_id: application.brand_id,
        agreed_price: application.expected_rate || 0,
        deal_status: "accepted",
      },
      { transaction }
    );

    // Commit transaction (save all changes)
    await transaction.commit();

    res.json({
      success: true,
      message: "Application accepted and deal created",
      data: deal,
    });
  } catch (error) {
    // Rollback all DB changes if error occurs
    await transaction.rollback();

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Brand rejects an application
 * @route   POST /api/applications/:id/reject
 * @access  Brand (Protected)
 */
export const rejectApplication = async (req, res) => {
  try {
    const { id } = req.params;

    // Find application
    const application = await Application.findByPk(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // ❌ Update status to rejected
    application.status = "rejected";
    await application.save();

    res.json({
      success: true,
      message: "Application rejected successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Influencer withdraws their application
 * @route   POST /api/applications/:id/withdraw
 * @access  Influencer (Protected)
 */
export const withdrawApplication = async (req, res) => {
  try {
    const { id } = req.params;

    // Logged-in influencer ID
    const influencerId = req.user.userId;

    // Find application that belongs to this influencer
    const application = await Application.findOne({
      where: {
        id,
        influencer_id: influencerId,
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // 🔁 Update status to withdrawn
    application.status = "withdrawn";
    await application.save();

    res.json({
      success: true,
      message: "Application withdrawn successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};