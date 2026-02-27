import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import BusinessHack from "./BusinessHacks.js";

const BusinessHackDetail = sequelize.define(
  "BusinessHackDetail",
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

    // Deliverables
    noOfReels: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    noOfPosts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    noOfStories: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    numberOfInfluencersRequired: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    minimumFollowersRequired: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    costPerInfluencer: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    tax: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    totalBudget: {
      type: DataTypes.FLOAT,
    },

    freeProduct: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "business_hack_details",
    timestamps: true,
  }
);

// Association
BusinessHack.hasOne(BusinessHackDetail, {
  foreignKey: "businessHackId",
  onDelete: "CASCADE",
});

BusinessHackDetail.belongsTo(BusinessHack, {
  foreignKey: "businessHackId",
});

export default BusinessHackDetail;