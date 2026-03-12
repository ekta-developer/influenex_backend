import Referral from "../models/Referral.js";


/* =========================
   CREATE Referral
========================= */
export const createReferral = async (req, res) => {
  try {
    const { referral_name, referred_by } = req.body;

    if (!referral_name || !referred_by) {
      return res.status(400).json({
        status: false,
        message: "Referral name and referred by are required",
      });
    }

    const referral = await Referral.create({
      referral_name,
      referred_by,
    });

    res.status(201).json({
      status: true,
      message: "Referral created successfully",
      data: referral,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


/* =========================
   GET All Referrals
========================= */
export const getAllReferrals = async (req, res) => {
  try {

    const referrals = await Referral.findAll({
      order: [["created_at", "DESC"]],
    });

    res.json({
      status: true,
      data: referrals,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


/* =========================
   GET Referral by ID
========================= */
export const getReferralById = async (req, res) => {
  try {

    const { id } = req.params;

    const referral = await Referral.findByPk(id);

    if (!referral) {
      return res.status(404).json({
        status: false,
        message: "Referral not found",
      });
    }

    res.json({
      status: true,
      data: referral,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


/* =========================
   UPDATE Referral
========================= */
export const updateReferral = async (req, res) => {
  try {

    const { id } = req.params;

    const referral = await Referral.findByPk(id);

    if (!referral) {
      return res.status(404).json({
        status: false,
        message: "Referral not found",
      });
    }

    await referral.update(req.body);

    res.json({
      status: true,
      message: "Referral updated successfully",
      data: referral,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


/* =========================
   DELETE Referral
========================= */
export const deleteReferral = async (req, res) => {
  try {

    const { id } = req.params;

    const referral = await Referral.findByPk(id);

    if (!referral) {
      return res.status(404).json({
        status: false,
        message: "Referral not found",
      });
    }

    await referral.destroy();

    res.json({
      status: true,
      message: "Referral deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};