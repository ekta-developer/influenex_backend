import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Application = sequelize.define(
  "Application",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    campaign_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    influencer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pitch_message: {
      type: DataTypes.TEXT,
    },
    expected_rate: {
      type: DataTypes.FLOAT,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "accepted",
        "rejected",
        "withdrawn"
      ),
      defaultValue: "pending",
    },
  },
  {
    tableName: "applications",
    timestamps: true,
  }
);

export default Application;