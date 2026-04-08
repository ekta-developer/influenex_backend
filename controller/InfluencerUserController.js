import influencersUser from "../models/InfluencerUser.js";
import BusinessRegistration from "../models/Business.js";

// ✅ CREATE Influencer
export const createInfluencer = async (req, res) => {
  try {
    const { fullName, mobileNumber, email, dob, city, gender } = req.body;

    if (!mobileNumber) {
      return res.status(200).json({
        response: {
          status: false,
          message: "Mobile number is required",
        },
      });
    }

    const business = await BusinessRegistration.findOne({
      where: { mobileNumber },
    });

    if (business) {
      return res.status(200).json({
        response: {
          status: false,
          message: "Number is already registered with business",
          businessId: business.id,
        },
      });
    }

    const influencerExists = await influencersUser.findOne({
      where: { mobileNumber },
    });

    if (influencerExists) {
      return res.status(200).json({
        response: {
          status: false,
          message: "Number is already registered with influencer user",
          influencerId: influencerExists.id,
        },
      });
    }

    const influencer = await influencersUser.create({
      fullName,
      mobileNumber,
      email,
      dob: dob ? new Date(dob) : null,
      city,
      gender: gender?.toLowerCase(),
    });

    return res.status(201).json({
      response: {
        status: true,
        message: "Influencer created successfully",
        ...influencer.toJSON(),
      },
    });
  } catch (error) {

    console.log("ERROR >>>", error);

    return res.status(500).json({
      response: {
        status: false,
        message: error.errors
          ? error.errors.map(e => e.message)
          : error.message,
      },
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
