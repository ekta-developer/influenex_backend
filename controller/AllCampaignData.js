import BusinessHack from "../models/BusinessHacks.js";
import BusinessHackDetails from "../models/BusinessHackDetail.js";
import BusinessHackStep3 from "../models/BusinessHackDetail2.js";
import BusinessHackStep4 from "../models/BusinessHackStep4.js";

export const getAllBusinessHackData = async (req, res) => {
  try {
    const userId = req.user?.userId;

    // ✅ सुरक्षा check
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized (user not found in token)",
      });
    }

    console.log("User ID:", userId);

    // ✅ Step 1: Get all hacks of this user
    const hacks = await BusinessHack.findAll({
      where: { user_id: userId },
      order: [["id", "DESC"]],
      raw: true,
    });

    if (!hacks.length) {
      return res.status(200).json({
        success: true,
        message: "No data found",
        data: [],
      });
    }

    // ✅ Extract all hack IDs
    const hackIds = hacks.map((h) => h.id);

    // ✅ Step 2: Fetch all related data in ONE GO (🔥 optimized)
    const [details, step3Data, step4Data] = await Promise.all([
      BusinessHackDetails.findAll({
        where: { businessHackId: hackIds },
        raw: true,
      }),
      BusinessHackStep3.findAll({
        where: { businessHackId: hackIds },
        raw: true,
      }),
      BusinessHackStep4.findAll({
        where: { businessHackId: hackIds },
        raw: true,
      }),
    ]);

    // ✅ Step 3: Convert arrays to map for fast lookup
    const detailsMap = {};
    const step3Map = {};
    const step4Map = {};

    details.forEach((d) => {
      detailsMap[d.businessHackId] = d;
    });

    step3Data.forEach((s) => {
      step3Map[s.businessHackId] = s;
    });

    step4Data.forEach((s) => {
      step4Map[s.businessHackId] = s;
    });

    // ✅ Step 4: Merge all data
    const fullData = hacks.map((hack) => ({
      business_hack: hack,
      business_hack_details: detailsMap[hack.id] || null,
      business_hack_step3: step3Map[hack.id] || null,
      business_hack_step4: step4Map[hack.id] || null,
    }));

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: fullData,
    });

  } catch (error) {
    console.error("MAIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};