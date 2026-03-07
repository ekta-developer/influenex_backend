import { convertToString } from "../HelperFunction/Helper.js";
import Business from "../models/Business.js";

// ✅ CREATE Business
export const createBusiness = async (req, res) => {
  try {
    const business = await Business.create(req.body);

    return res.status(201).json({
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
