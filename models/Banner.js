import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Banner = sequelize.define("banners", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Banner;