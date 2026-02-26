import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Campaign = sequelize.define("Campaign", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  campaignType: {
    type: DataTypes.ENUM("Paid", "Reimbursement", "Barter"),
    allowNull: false,
  },

  budgetPerInfluencer: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },

  totalInfluencersNeeded: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  deliverables: {
    type: DataTypes.STRING, // Reel/Post/Story
    allowNull: false,
  },

  captionRequirements: {
    type: DataTypes.TEXT,
  },

  hashtags: {
    type: DataTypes.STRING,
  },

  productDetails: {
    type: DataTypes.TEXT,
  },

  shippingDetails: {
    type: DataTypes.TEXT,
  },

  reimbursementPolicy: {
    type: DataTypes.TEXT,
  },

  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  targetNiche: {
    type: DataTypes.STRING,
  },

  targetCity: {
    type: DataTypes.STRING,
  },

  minimumFollowers: {
    type: DataTypes.INTEGER,
  },

  campaignStatus: {
    type: DataTypes.ENUM("Draft", "Live", "Closed", "Completed"),
    allowNull: false,
    defaultValue: "Draft",
  },
});

export default Campaign;