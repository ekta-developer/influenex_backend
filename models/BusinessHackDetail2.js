import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import BusinessHack from "./BusinessHacks.js";

const BusinessHackStep3 = sequelize.define(
  "BusinessHackStep3",
  {
    businessHackId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "business_hacks",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    influencerCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other", "All"),
      allowNull: false,
    },

    minAge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    maxAge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    campaignDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    dos: {
      type: DataTypes.TEXT,
    },

    donts: {
      type: DataTypes.TEXT,
    },

    isDosRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    isDontsRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "business_hack_step3",
    timestamps: true,
  }
);

// Association
BusinessHack.hasOne(BusinessHackStep3, {
  foreignKey: "businessHackId",
  onDelete: "CASCADE",
});

BusinessHackStep3.belongsTo(BusinessHack, {
  foreignKey: "businessHackId",
});

export default BusinessHackStep3;