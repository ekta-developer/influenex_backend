import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Referral = sequelize.define(
  "Referral",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    referral_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    referred_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "referrals",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Referral;