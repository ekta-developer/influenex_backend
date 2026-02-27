import BusinessHackStep3 from "../models/BusinessHackDetail2.js";
import BusinessHack from "../models/BusinessHacks.js";

// ✅ CREATE
export const createBusinessHackStep3 = async (req, res) => {
  try {
    const {
      businessHackId,
      influencerCategory,
      gender,
      minAge,
      maxAge,
      campaignDescription,
      dos,
      donts,
      isDosRequired,
      isDontsRequired,
    } = req.body;

    // Validate age range
    if (minAge >= maxAge) {
      return res.status(400).json({
        success: false,
        message: "Minimum age must be less than maximum age",
      });
    }

    // Check Step-1 exists
    const campaign = await BusinessHack.findByPk(businessHackId);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Business Hack not found",
      });
    }

    const step3 = await BusinessHackStep3.create({
      businessHackId,
      influencerCategory,
      gender,
      minAge,
      maxAge,
      campaignDescription,
      dos,
      donts,
      isDosRequired,
      isDontsRequired,
    });

    res.status(201).json({
      success: true,
      message: "Business Hack Step-3 created successfully",
      data: step3,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// ✅ GET ALL
export const getAllBusinessHackStep3 = async (req, res) => {
  try {
    const data = await BusinessHackStep3.findAll({
      include: BusinessHack,
      order: [["id", "DESC"]],
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


// ✅ GET SINGLE
export const getBusinessHackStep3ById = async (req, res) => {
  try {
    const data = await BusinessHackStep3.findByPk(req.params.id, {
      include: BusinessHack,
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Step-3 not found",
      });
    }

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
export const updateBusinessHackStep3 = async (req, res) => {
  try {
    const step3 = await BusinessHackStep3.findByPk(req.params.id);

    if (!step3) {
      return res.status(404).json({
        success: false,
        message: "Step-3 not found",
      });
    }

    const {
      influencerCategory,
      gender,
      minAge,
      maxAge,
      campaignDescription,
      dos,
      donts,
      isDosRequired,
      isDontsRequired,
    } = req.body;

    const updatedMinAge = minAge ?? step3.minAge;
    const updatedMaxAge = maxAge ?? step3.maxAge;

    if (updatedMinAge >= updatedMaxAge) {
      return res.status(400).json({
        success: false,
        message: "Minimum age must be less than maximum age",
      });
    }

    step3.influencerCategory = influencerCategory ?? step3.influencerCategory;
    step3.gender = gender ?? step3.gender;
    step3.minAge = updatedMinAge;
    step3.maxAge = updatedMaxAge;
    step3.campaignDescription =
      campaignDescription ?? step3.campaignDescription;
    step3.dos = dos ?? step3.dos;
    step3.donts = donts ?? step3.donts;
    step3.isDosRequired = isDosRequired ?? step3.isDosRequired;
    step3.isDontsRequired = isDontsRequired ?? step3.isDontsRequired;

    await step3.save();

    res.status(200).json({
      success: true,
      message: "Business Hack Step-3 updated successfully",
      data: step3,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// ✅ DELETE
export const deleteBusinessHackStep3 = async (req, res) => {
  try {
    const step3 = await BusinessHackStep3.findByPk(req.params.id);

    if (!step3) {
      return res.status(404).json({
        success: false,
        message: "Step-3 not found",
      });
    }

    await step3.destroy();

    res.status(200).json({
      success: true,
      message: "Business Hack Step-3 deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};