import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Deal = sequelize.define(
  "Deal",
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

    application_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    influencer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "influencer_id", // 🔥 force exact DB column
    },

    business_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "business_id", // 🔥 force exact DB column
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    agreed_price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    deal_status: {
      type: DataTypes.ENUM(
        "accepted",
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "completed",
      ),
      defaultValue: "accepted",
    },

    content_link: {
      type: DataTypes.TEXT,
    },

    proof_files: {
      type: DataTypes.JSON,
    },

    submitted_at: {
      type: DataTypes.DATE,
    },

    approved_at: {
      type: DataTypes.DATE,
    },

    // ✅ Optional (for faster API, no joins)
    businessName: {
      type: DataTypes.STRING,
    },

    influencerName: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "deals",
    timestamps: true,
    freezeTableName: true, // 🔥 important
  },
);

export default Deal;
