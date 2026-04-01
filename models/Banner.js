import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import xss from "xss";

const Banner = sequelize.define(
  "banners",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255], // prevent very long/malicious input
        is: /^[a-zA-Z0-9._/-]+$/i, // allow safe file paths only
      },
    },
  },
  {
    timestamps: true,

    hooks: {
      beforeCreate: (banner) => {
        if (banner.image) {
          banner.image = xss(banner.image);
        }
      },

      beforeUpdate: (banner) => {
        if (banner.image) {
          banner.image = xss(banner.image);
        }
      },
    },
  }
);

export default Banner;