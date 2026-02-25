import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const City = sequelize.define(
  "City",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    state: DataTypes.STRING,
    country: {
      type: DataTypes.STRING,
      defaultValue: "India",
    },
  },
  {
    tableName: "Cities", // 👈 match EXACT DB table name
    freezeTableName: true, // 👈 stop pluralizing
  },
);

export default City;
