import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const BusinessRegistration = sequelize.define(
  "BusinessRegistration",
  {
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gstNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "business_registration", // 👈 your custom table name
    freezeTableName: true, // 👈 prevents pluralization
    timestamps: true,
  }
);

export default BusinessRegistration;