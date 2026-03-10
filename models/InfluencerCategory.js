import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const InfluencerCategory = sequelize.define(
  "InfluencerCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    //added as a foreign key
    influencer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "influencersUser",
        key: "id",
      },
    },

    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "influencer_category",
    timestamps: true,
  },
);

export default InfluencerCategory;
