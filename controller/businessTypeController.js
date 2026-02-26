import BusinessType from "../models/BusinessTypes.js";

// ✅ Get All Business Types
export const getAllBusinessTypes = async (req, res) => {
  try {
    const businessTypes = await BusinessType.findAll({
      attributes: [
        ["id", "id"],
        ["name", "name"],
      ],
      order: [["id", "ASC"]],
    });

    res.status(200).json({
      success: true,
      count: businessTypes.length,
      data: businessTypes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching business types",
      error: error.message,
    });
  }
};
