import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const BusinessRegistration = sequelize.define(
  "BusinessRegistration",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },

    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      allowNull: true,
      unique: true,
    },
    business_user_id: {
      type: DataTypes.UUID, // or STRING
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.JSON, // or ARRAY
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    tableName: "business_registration",
    freezeTableName: true,
    timestamps: true,

    hooks: {
      beforeCreate: (business, options) => {
        if (options.userId) {
          business.business_user_id = options.userId;
        }
      },
    },
  },
);

export default BusinessRegistration;
