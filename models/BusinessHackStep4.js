import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import BusinessHack from "./BusinessHacks.js";

const BusinessHackStep4 = sequelize.define(
  "BusinessHackStep4",
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

    campaignImage: {
      type: DataTypes.STRING,
    },

    sampleMedia: {
      // store multiple images as JSON array
      type: DataTypes.JSON,
    },
  },
  {
    tableName: "business_hack_step4",
    timestamps: true,
  }
);

// Association
BusinessHack.hasOne(BusinessHackStep4, {
  foreignKey: "businessHackId",
  onDelete: "CASCADE",
});

BusinessHackStep4.belongsTo(BusinessHack, {
  foreignKey: "businessHackId",
});

export default BusinessHackStep4;