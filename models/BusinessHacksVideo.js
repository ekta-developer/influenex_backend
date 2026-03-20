import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const BusinessHacks = sequelize.define(
  "BusinessHacksVideo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },

    thumbnail: {
      type: DataTypes.STRING(255),
    },

    video: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    uploader: {
      type: DataTypes.STRING(100),
    },

    duration: {
      type: DataTypes.STRING(20),
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
  },
);

export default BusinessHacks;
