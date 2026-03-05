import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Influencer = sequelize.define(
  "Influencer",
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
      validate: {
        isEmail: true,
      },
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
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: false,
    },
  },
  {
    tableName: "influencersUser",
    timestamps: true,
  },
);

export default Influencer;
