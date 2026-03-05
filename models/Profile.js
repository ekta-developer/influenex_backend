import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Profile = sequelize.define("Profile", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  businessName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  businessCategories: {
    type: DataTypes.STRING,
  },
  headQuarters: {
    type: DataTypes.STRING,
  },
  foundedIn: {
    type: DataTypes.INTEGER,
  },
  website: {
    type: DataTypes.STRING,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  businessDetails: {
    type: DataTypes.TEXT,
  },
  gstin: {
    type: DataTypes.STRING,
  },
  panNumber: {
    type: DataTypes.STRING,
  },
  businessAddress: {
    type: DataTypes.TEXT,
  },
  postalCode: {
    type: DataTypes.STRING,
  },
  profileImage: {
    type: DataTypes.STRING,
  },
});

export default Profile;