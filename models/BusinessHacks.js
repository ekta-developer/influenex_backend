import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const BusinessHack = sequelize.define(
  "BusinessHack",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    campaignName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
);

export default BusinessHack;
