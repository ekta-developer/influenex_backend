import axios from "axios";
import chalk from "chalk";
import City from "../models/cities.js";

export const importIndianCities = async (req, res) => {
  console.log(chalk.blue("🚀 Starting Indian Cities Import..."));

  try {
    console.log(chalk.yellow("🌍 Fetching data from third-party API..."));

    const response = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/cities",
      {
        country: "India", // Always better to keep first letter capital
      },
    );

    // Check if response exists
    if (!response.data || !response.data.data) {
      console.log(chalk.red("❌ No data received from API"));
      return res.status(400).json({ error: "No data received from API" });
    }

    const cities = response.data.data;

    console.log(
      chalk.green(
        `✅ Data fetched successfully. Total cities: ${cities.length}`,
      ),
    );

    if (cities.length === 0) {
      console.log(chalk.red("⚠️ Cities array is empty"));
      return res.status(400).json({ error: "No cities found" });
    }

    // Convert cities into array of objects
    const cityData = cities.map((city) => ({
      name: city,
      country: "India",
    }));

    console.log(chalk.cyan("💾 Inserting cities into database..."));

    const inserted = await City.bulkCreate(cityData, {
      ignoreDuplicates: true,
    });

    console.log(
      chalk.green.bold(
        `🎉 Successfully inserted ${inserted.length} cities into database`,
      ),
    );

    res.status(200).json({
      message: "Indian cities imported successfully",
      totalFetched: cities.length,
      totalInserted: inserted.length,
    });
  } catch (error) {
    console.log(chalk.red.bold("🔥 ERROR OCCURRED"));
    console.error(chalk.red(error.message));
    res.status(500).json({ error: "Failed to import cities" });
  }
};

// GET all cities for dropdown
export const getAllCitiesDropdown = async (req, res) => {
  try {
    const cities = await City.findAll({
      attributes: ["id", "name"], // Only required fields
      order: [["name", "ASC"]], // Sort alphabetically
    });

    res.status(200).json({
      success: true,
      total: cities.length,
      data: cities,
    });
  } catch (error) {
    console.error("Error fetching cities:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cities",
    });
  }
};
