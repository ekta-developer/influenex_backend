import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const City = sequelize.define(
  "City",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    population: DataTypes.BIGINT,
    is_capital: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    city_type: {
      type: DataTypes.ENUM("metropolitan", "tier1", "tier2", "tier3"),
      defaultValue: "tier2",
    },
  },
  {
    tableName: "cities",
    timestamps: true,
    underscored: true,
  }
);

export default City;