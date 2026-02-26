import CampaignType from "../models/CampaignType.js";

export const seedCampaignTypes = async () => {
  const types = ["Paid", "Reimbursement", "Barter"];

  for (let type of types) {
    await CampaignType.findOrCreate({
      where: { typeName: type },
    });
  }

  console.log("Campaign types seeded successfully");
};