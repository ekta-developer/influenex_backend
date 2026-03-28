import { DataTypes, Sequelize } from "sequelize";
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
      allowNull: false,
      validate: { notEmpty: true },
    },

    profilePhoto: DataTypes.STRING,

    instagramUsername: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true },
    },

    followersCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },

    engagementRate: {
      type: DataTypes.FLOAT,
      validate: { min: 0, max: 100 },
    },

    niche: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: Sequelize.literal("ARRAY[]::TEXT[]"),
    },

    city: DataTypes.STRING,
    bio: DataTypes.TEXT,

    rateCard: {
      type: DataTypes.FLOAT,
      validate: { min: 0 },
    },

    portfolioLinks: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: Sequelize.literal("ARRAY[]::TEXT[]"),
    },

    languages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: Sequelize.literal("ARRAY[]::TEXT[]"),
    },

    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: false,
    },

    contentCategories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: Sequelize.literal("ARRAY[]::TEXT[]"),
    },
  },
  {
    timestamps: true,
  }
);

export default Influencer;