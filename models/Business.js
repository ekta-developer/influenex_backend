  import { DataTypes } from "sequelize";
  import sequelize from "../config/database.js";

  const BusinessRegistration = sequelize.define(
    "BusinessRegistration",
    {
      businessName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [10, 15],
        },
      },

      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      businessType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      gstNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      tableName: "business_registration",
      freezeTableName: true,
      timestamps: true,
    },
  );

  export default BusinessRegistration;
