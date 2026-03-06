import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const BusinessProfile = sequelize.define(
  "BusinessProfile",
  {
    name:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },

    businessCategory:
    {
      type: DataTypes.STRING,
    },

    headquarters: 
    {
      type: DataTypes.STRING,
    },

    foundedIn:
    {
      type: DataTypes.INTEGER,
    },

    website:
    {
      type: DataTypes.STRING,
    },

    bio: {
      type: DataTypes.TEXT,
    },

    businessName: {
      type: DataTypes.STRING,
    },

    gstin: {
      type: DataTypes.STRING,
    },

    panNumber: {
      type: DataTypes.STRING,
    },

    businessAddress: {
      type: DataTypes.TEXT,
    },

    postalCode: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "business_profiles",
    timestamps: true,
  }
);

export default BusinessProfile;