import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const BusinessType = sequelize.define("BusinessType", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "business_types",
  timestamps: true,
});

export default BusinessType;