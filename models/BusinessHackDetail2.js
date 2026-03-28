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
      type: DataTypes.JSONB,
      allowNull: false,
    },

    gender: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: ["All"], // ✅ IMPORTANT
      validate: {
        isArray(value) {
          if (!Array.isArray(value)) {
            throw new Error("Gender must be an array");
          }
        },
        validValues(value) {
          const allowed = ["Male", "Female", "Other", "All"];

          value.forEach((v) => {
            if (!allowed.includes(v)) {
              throw new Error(`Invalid gender: ${v}`);
            }
          });
        },
      },
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

    // ✅ Store array of strings
    dos: {
      type: DataTypes.JSONB,
      allowNull: true,
    },

    donts: {
      type: DataTypes.JSONB,
      allowNull: true,
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
  },
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
