import CampaignType from "../models/CampaignType.js";

export const seedCampaignTypes = async () => {
  try {
    // 🔥 Step 1: Clear existing data
    await CampaignType.destroy({ where: {}, truncate: true });

    // 🔥 Step 2: Seed fresh data
    const types = ["Paid", "Reimbursement", "Barter"];

    for (let type of types) {
      await CampaignType.create({
        typeName: type,
      });
    }

    console.log("✅ Campaign types seeded successfully");
  } catch (error) {
    console.error("❌ Seeder Error:", error);
  }
};