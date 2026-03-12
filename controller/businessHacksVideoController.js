import BusinessHacks from "../models/BusinessHacksVideo.js";


// ===============================
// CREATE Business Hack
// ===============================
export const createBusinessHack = async (req, res) => {
  try {
    const {
      title,
      description,
      thumbnail,
      video_url,
      uploader,
      duration,
      views,
      likes,
    } = req.body;

    if (!title || !video_url) {
      return res.status(400).json({
        status: false,
        message: "Title and Video URL are required",
      });
    }

    const hack = await BusinessHacks.create({
      title,
      description,
      thumbnail,
      video_url,
      uploader,
      duration,
      views,
      likes,
    });

    res.status(201).json({
      status: true,
      message: "Business Hack created successfully",
      data: hack,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// ===============================
// GET All Business Hacks
// ===============================
export const getAllBusinessHacks = async (req, res) => {
  try {
    const hacks = await BusinessHacks.findAll({
      order: [["created_at", "DESC"]],
    });

    res.json({
      status: true,
      data: hacks,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// ===============================
// GET Single Business Hack
// ===============================
export const getBusinessHackById = async (req, res) => {
  try {
    const { id } = req.params;

    const hack = await BusinessHacks.findByPk(id);

    if (!hack) {
      return res.status(404).json({
        status: false,
        message: "Business Hack not found",
      });
    }

    res.json({
      status: true,
      data: hack,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// ===============================
// UPDATE Business Hack
// ===============================
export const updateBusinessHack = async (req, res) => {
  try {
    const { id } = req.params;

    const hack = await BusinessHacks.findByPk(id);

    if (!hack) {
      return res.status(404).json({
        status: false,
        message: "Business Hack not found",
      });
    }

    await hack.update(req.body);

    res.json({
      status: true,
      message: "Business Hack updated successfully",
      data: hack,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// ===============================
// DELETE Business Hack
// ===============================
export const deleteBusinessHack = async (req, res) => {
  try {
    const { id } = req.params;

    const hack = await BusinessHacks.findByPk(id);

    if (!hack) {
      return res.status(404).json({
        status: false,
        message: "Business Hack not found",
      });
    }

    await hack.destroy();

    res.json({
      status: true,
      message: "Business Hack deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};