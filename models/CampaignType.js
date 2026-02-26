import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CampaignType = sequelize.define(
  "CampaignType",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    typeName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "campaign_types",
    freezeTableName: true,
    timestamps: true,
  }
);

export default CampaignType;