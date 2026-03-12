import InfluencerList from "../models/InfluencerList.js";

export const seedInfluencerList = async () => {
  const data = [
    {
      name: "Priya • 9.8M Followers",
      desc: "Just connected her Instagram and unlocked premium brand campaigns.",
    },
    {
      name: "Rahul • 2.3M Followers",
      desc: "Verified profile and started earning from brand deals.",
    },
    {
      name: "Aisha • 5.1M Followers",
      desc: "Unlocked exclusive barter and paid collaborations.",
    },
    {
      name: "Priya • 9.8M Followers",
      desc: "Just connected her Instagram and unlocked premium brand campaigns.",
    },
    {
      name: "Rahul • 2.3M Followers",
      desc: "Verified profile and started earning from brand deals.",
    },
    {
      name: "Aisha • 5.1M Followers",
      desc: "Unlocked exclusive barter and paid collaborations.",
    },
  ];

  await InfluencerList.bulkCreate(data);

  console.log("Influencer list seeded successfully");
};