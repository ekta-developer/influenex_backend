import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Otp = sequelize.define(
  "Otp",
  {
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "otps",
    timestamps: true, // ✅ This creates createdAt & updatedAt
  }
);

export default Otp;