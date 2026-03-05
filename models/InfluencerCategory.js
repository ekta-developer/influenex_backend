import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const InfluencerCategory = sequelize.define(
  "InfluencerCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "influencer_category",
    timestamps: true,
  },
);

export default InfluencerCategory;
