import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const BusinessHacks = sequelize.define(
  "BusinessHacksVideo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    thumbnail: {
      type: DataTypes.STRING,
    },

    video_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    uploader: {
      type: DataTypes.STRING,
    },

    duration: {
      type: DataTypes.STRING,
    },

    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "business_hacks_video",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default BusinessHacks;