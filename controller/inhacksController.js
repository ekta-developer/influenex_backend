import InHacks from "../models/InHacks.js";


// CREATE VIDEO
export const createInhack = async (req, res) => {
  try {
    const data = await InHacks.create(req.body);

    res.json({
      status: true,
      message: "Video uploaded successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// GET ALL VIDEOS
export const getAllInhacks = async (req, res) => {
  try {
    const data = await InHacks.findAll({
      order: [["created_at", "DESC"]],
    });

    res.json({
      status: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// GET SINGLE VIDEO
export const getSingleInhack = async (req, res) => {
  try {
    const data = await InHacks.findByPk(req.params.id);

    if (!data) {
      return res.json({
        status: false,
        message: "Video not found",
      });
    }

    res.json({
      status: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// UPDATE VIDEO
export const updateInhack = async (req, res) => {
  try {
    const data = await InHacks.findByPk(req.params.id);

    if (!data) {
      return res.json({
        status: false,
        message: "Video not found",
      });
    }

    await data.update(req.body);

    res.json({
      status: true,
      message: "Video updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// DELETE VIDEO
export const deleteInhack = async (req, res) => {
  try {
    const data = await InHacks.findByPk(req.params.id);

    if (!data) {
      return res.json({
        status: false,
        message: "Video not found",
      });
    }

    await data.destroy();

    res.json({
      status: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};