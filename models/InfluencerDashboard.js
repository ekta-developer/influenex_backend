import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const InfluencerDashboard = sequelize.define("influencer_dashboard", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  device_type: {
    type: DataTypes.STRING,
  },

  token: {
    type: DataTypes.TEXT,
  },
});

export default InfluencerDashboard;