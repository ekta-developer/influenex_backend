import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import xss from "xss";

const BusinessHack = sequelize.define(
  "BusinessHack",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },

    campaignName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 150],
      },
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },

    campaignType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Paid", "Reimbursement", "Barter"]],
      },
    },
  },
  {
    tableName: "business_hacks",
    timestamps: true,

    hooks: {
      beforeValidate: (data) => {
        sanitizeBusinessHack(data);
      },
    },
  }
);

// 🔐 Sanitizer (Improved)
function sanitizeBusinessHack(data) {
  if (data.campaignName) {
    data.campaignName = xss(data.campaignName.trim());
  }

  if (data.state) {
    data.state = xss(data.state.trim());
  }

  if (data.city) {
    data.city = xss(data.city.trim());
  }

  // safer number conversion
  if (data.user_id !== undefined) {
    data.user_id = Number(data.user_id);

    if (Number.isNaN(data.user_id)) {
      throw new Error("Invalid user_id");
    }
  }
}

export default BusinessHack;