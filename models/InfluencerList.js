import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const InfluencerList = sequelize.define(
  "InfluencerList",
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
    followers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "influencer_list",
    timestamps: true,
  }
);

export default InfluencerList;  