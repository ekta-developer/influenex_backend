import BusinessHackDetail from "../models/BusinessHackDetail.js";
import BusinessHack from "../models/BusinessHacks.js";

// ✅ CREATE STEP-2
export const createBusinessHackDetail = async (req, res) => {
  try {
    const {
      businessHackId,
      noOfReels,
      noOfPosts,
      noOfStories,
      numberOfInfluencersRequired,
      minimumFollowersRequired,
      costPerInfluencer,
      tax,
      freeProduct,
    } = req.body;

    // Check Step-1 exists
    const campaign = await BusinessHack.findByPk(businessHackId);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Business Hack not found",
      });
    }

    const baseAmount = costPerInfluencer * numberOfInfluencersRequired;

    const taxAmount = (baseAmount * tax) / 100;

    const totalBudget = baseAmount + taxAmount;

    const detail = await BusinessHackDetail.create({
      businessHackId,
      noOfReels,
      noOfPosts,
      noOfStories,
      numberOfInfluencersRequired,
      minimumFollowersRequired,
      costPerInfluencer,
      tax,
      totalBudget,
      freeProduct,
    });

    res.status(201).json({
      response: {
        success: true,
        message: "Business Hack Step-2 created successfully",
        ...detail.dataValues,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ GET ALL
export const getAllBusinessHackDetails = async (req, res) => {
  try {
    const details = await BusinessHackDetail.findAll({
      include: BusinessHack,
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: details,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ GET SINGLE
export const getBusinessHackDetailById = async (req, res) => {
  try {
    const detail = await BusinessHackDetail.findByPk(req.params.id, {
      include: BusinessHack,
    });

    if (!detail) {
      return res.status(404).json({
        success: false,
        message: "Detail not found",
      });
    }

    res.status(200).json({
      success: true,
      data: detail,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ UPDATE
export const updateBusinessHackDetail = async (req, res) => {
  try {
    const detail = await BusinessHackDetail.findByPk(req.params.id);

    if (!detail) {
      return res.status(404).json({
        success: false,
        message: "Detail not found",
      });
    }

    const {
      noOfReels,
      noOfPosts,
      noOfStories,
      numberOfInfluencersRequired,
      minimumFollowersRequired,
      costPerInfluencer,
      tax,
      freeProduct,
    } = req.body;

    const updatedInfluencers =
      numberOfInfluencersRequired ?? detail.numberOfInfluencersRequired;

    const updatedCPI = costPerInfluencer ?? detail.costPerInfluencer;

    const updatedTax = tax ?? detail.tax;

    const baseAmount = updatedCPI * updatedInfluencers;
    const taxAmount = (baseAmount * updatedTax) / 100;
    const totalBudget = baseAmount + taxAmount;

    detail.noOfReels = noOfReels ?? detail.noOfReels;
    detail.noOfPosts = noOfPosts ?? detail.noOfPosts;
    detail.noOfStories = noOfStories ?? detail.noOfStories;
    detail.numberOfInfluencersRequired = updatedInfluencers;
    detail.minimumFollowersRequired =
      minimumFollowersRequired ?? detail.minimumFollowersRequired;
    detail.costPerInfluencer = updatedCPI;
    detail.tax = updatedTax;
    detail.totalBudget = totalBudget;
    detail.freeProduct = freeProduct ?? detail.freeProduct;

    await detail.save();

    res.status(200).json({
      success: true,
      message: "Business Hack Step-2 updated successfully",
      data: detail,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ DELETE
export const deleteBusinessHackDetail = async (req, res) => {
  try {
    const detail = await BusinessHackDetail.findByPk(req.params.id);

    if (!detail) {
      return res.status(404).json({
        success: false,
        message: "Detail not found",
      });
    }

    await detail.destroy();

    res.status(200).json({
      success: true,
      message: "Business Hack Step-2 deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
