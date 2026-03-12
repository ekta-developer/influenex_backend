import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const InHacks = sequelize.define(
  "InHacks",
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
    tableName: "inhacks",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default InHacks;