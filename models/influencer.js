import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Influencer = sequelize.define(
  "Influencer",
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    profilePhoto: {
      type: DataTypes.STRING,
    },
    instagramUsername: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true },
    },
    followersCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
    },
    engagementRate: {
      type: DataTypes.FLOAT,
      validate: { min: 0, max: 100 },
    },
    niche: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    city: DataTypes.STRING,
    bio: DataTypes.TEXT,
    rateCard: DataTypes.STRING,
    portfolioLinks: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    languages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    gender: DataTypes.STRING,
    contentCategories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  { timestamps: true }
);

export default Influencer;