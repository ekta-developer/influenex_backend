import { convertToString } from "../HelperFunction/Helper.js";
import Influencer from "../models/InfluencerUser.js";
import BusinessRegistration from "../models/Business.js";

// ✅ CREATE Business
export const createBusiness = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
      return res.status(200).json({
        success: false,
        message: "Mobile number is required",
        data: null,
      });
    }

    // 🔹 Check in InfluencerUser table
    const influencerUser = await Influencer.findOne({
      where: { mobileNumber },
    });

    if (influencerUser) {
      return res.status(200).json({
        success: false,
        message: "Number already registered with influencer user",
        data: null,
      });
    }

    // 🔹 Check in BusinessRegistration table
    const businessRegistration = await BusinessRegistration.findOne({
      where: { mobileNumber },
    });

    if (businessRegistration) {
      return res.status(200).json({
        success: false,
        message: "Number already registered with business registration",
        data: null,
      });
    }

    // 🔹 Convert empty GST to null
    const payload = {
      ...req.body,
      gstNumber: req.body.gstNumber || null,
    };

    // 🔹 Create Business
    const business = await Business.create(payload);

    return res.status(200).json({
      success: true,
      message: "Business registered successfully",
      data: convertToString(business.toJSON()),
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ GET ALL Businesses
export const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.findAll();

    return res.status(200).json({
      success: true,
      data: convertToString(businesses.map((b) => b.toJSON())),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ GET Single Business
export const getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;

    const business = await Business.findByPk(id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: convertToString(business.toJSON()),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ UPDATE Business
export const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    const business = await Business.findByPk(id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    await business.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Business updated successfully",
      data: convertToString(business.toJSON()),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ DELETE Business
export const deleteBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    const business = await Business.findByPk(id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    await business.destroy();

    return res.status(200).json({
      success: true,
      message: "Business deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
