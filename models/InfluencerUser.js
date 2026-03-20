import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const InfluencerUser = sequelize.define(
  "InfluencerUser",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
    },
    refreshToken: {
      type: DataTypes.JSON, // or ARRAY
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    tableName: "influencersUser",
    timestamps: true,
  },
);

export default InfluencerUser;
