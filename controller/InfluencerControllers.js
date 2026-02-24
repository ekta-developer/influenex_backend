import Influencer from "../models/influencer.js";
import sequelize from "../config/database.js";
import slugify from "slugify";

export const createInfluencer = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      fullName,
      instagramUsername,
      followersCount,
      engagementRate,
      niche,
      city,
      bio,
      rateCard,
      portfolioLinks,
      languages,
      gender,
      contentCategories,
    } = req.body;

    // ✅ Safe Array Parser (Handles form-data properly)
    const parseArray = (field) => {
      if (!field) return [];

      // If already array
      if (Array.isArray(field)) return field;

      // If comma separated string (Fashion,Travel)
      if (typeof field === "string" && !field.startsWith("[")) {
        return field.split(",").map((item) => item.trim());
      }

      // If JSON string
      try {
        return JSON.parse(field);
      } catch {
        return [];
      }
    };

    // ✅ Convert numbers safely (form-data sends string)
    const parsedFollowers = Number(followersCount);
    const parsedEngagement = engagementRate ? Number(engagementRate) : null;

    // 🔎 Basic Validation
    if (!fullName || !instagramUsername || !parsedFollowers) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Full name, Instagram username & followers count are required",
      });
    }

    // 🔎 Check Unique Instagram
    const existingUser = await Influencer.findOne({
      where: { instagramUsername },
    });

    if (existingUser) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Instagram username already exists",
      });
    }

    // 🖼 Handle Image
    const profilePhoto = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    // 🔗 Generate Slug
    const slug = slugify(`${fullName}-${instagramUsername}`, {
      lower: true,
      strict: true,
    });

    // ✅ Create Influencer
    const influencer = await Influencer.create(
      {
        fullName,
        slug,
        profilePhoto,
        instagramUsername,
        followersCount: parsedFollowers,
        engagementRate: parsedEngagement,
        niche: parseArray(niche),
        city,
        bio,
        rateCard,
        portfolioLinks: parseArray(portfolioLinks),
        languages: parseArray(languages),
        gender,
        contentCategories: parseArray(contentCategories),
      },
      { transaction },
    );

    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: "Influencer created successfully",
      data: influencer,
    });
  } catch (error) {
    console.error("FULL ERROR:", error);
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
export const updateInfluencer = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const influencer = await Influencer.findByPk(id);

    if (!influencer) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: "Influencer not found",
      });
    }

    const {
      fullName,
      instagramUsername,
      followersCount,
      engagementRate,
      niche,
      city,
      bio,
      rateCard,
      portfolioLinks,
      languages,
      gender,
      contentCategories,
    } = req.body;

    // ✅ Safe Array Parser
    const parseArray = (field) => {
      if (!field) return [];

      if (Array.isArray(field)) return field;

      if (typeof field === "string" && !field.startsWith("[")) {
        return field.split(",").map((item) => item.trim());
      }

      try {
        return JSON.parse(field);
      } catch {
        return [];
      }
    };

    // ✅ Convert numbers safely
    const parsedFollowers = followersCount
      ? Number(followersCount)
      : influencer.followersCount;

    const parsedEngagement = engagementRate
      ? Number(engagementRate)
      : influencer.engagementRate;

    // 🔎 Prevent duplicate Instagram username
    if (
      instagramUsername &&
      instagramUsername !== influencer.instagramUsername
    ) {
      const existingUser = await Influencer.findOne({
        where: { instagramUsername },
      });

      if (existingUser) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: "Instagram username already exists",
        });
      }
    }

    // 🖼 Handle Image Update
    let profilePhoto = influencer.profilePhoto;

    if (req.file) {
      // Delete old image if exists
      if (profilePhoto) {
        const oldImageName = profilePhoto.split("/uploads/")[1];
        const oldImagePath = path.join("uploads", oldImageName);

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      profilePhoto = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    // 🔗 Regenerate slug if name or username changed
    const updatedSlug =
      fullName || instagramUsername
        ? slugify(
            `${fullName || influencer.fullName}-${
              instagramUsername || influencer.instagramUsername
            }`,
            { lower: true, strict: true },
          )
        : influencer.slug;

    // ✅ Update Influencer
    await influencer.update(
      {
        fullName: fullName || influencer.fullName,
        slug: updatedSlug,
        profilePhoto,
        instagramUsername: instagramUsername || influencer.instagramUsername,
        followersCount: parsedFollowers,
        engagementRate: parsedEngagement,
        niche: niche ? parseArray(niche) : influencer.niche,
        city: city || influencer.city,
        bio: bio || influencer.bio,
        rateCard: rateCard || influencer.rateCard,
        portfolioLinks: portfolioLinks
          ? parseArray(portfolioLinks)
          : influencer.portfolioLinks,
        languages: languages ? parseArray(languages) : influencer.languages,
        gender: gender || influencer.gender,
        contentCategories: contentCategories
          ? parseArray(contentCategories)
          : influencer.contentCategories,
      },
      { transaction },
    );

    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "Influencer updated successfully",
      data: influencer,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY ID
export const getInfluencerById = async (req, res) => {
  try {
    const influencer = await Influencer.findByPk(req.params.id);
    if (!influencer)
      return res.status(404).json({ message: "Influencer not found" });

    res.status(200).json(influencer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
export const getAllInfluencers = async (req, res) => {
  try {
    const influencers = await Influencer.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      total: influencers.length,
      data: influencers,
    });
  } catch (error) {
    console.error("GET ALL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// DELETE
export const deleteInfluencer = async (req, res) => {
  try {
    const influencer = await Influencer.findByPk(req.params.id);
    if (!influencer)
      return res.status(404).json({ message: "Influencer not found" });

    await influencer.destroy();
    res.status(200).json({ message: "Influencer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
