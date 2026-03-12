import Banner from "../models/Banner.js";
import InfluencerUser from "../models/InfluencerUser.js";
import BusinessRegistration from "../models/Business.js";
import Referral from "../models/Referral.js";
import Campaign from "../models/Campaign.js";
import BusinessHackVideo from "../models/BusinessHacksVideo.js";
import InfluencerDashboard from "../models/InfluencerDashboard.js";
import InHacks from "../models/InHacks.js";
import { convertIdToString } from "../HelperFunction/Helper.js";

export const getInfluencerDashboard = async (req, res) => {
  try {
    const { device_type, token } = req.body || {};

    const baseUrl = req.protocol + "://" + req.get("host");

    if (token) {
      await InfluencerDashboard.create({
        device_type: device_type || null,
        token,
      });
    }

    /* ================= FETCH DATA ================= */

    const [
      banners,
      referrals,
      campaigns,
      businessVideos,
      inhacksVideos,
      influencerCount,
      businessCount,
    ] = await Promise.all([
      Banner.findAll({
        attributes: ["id", "image"],
        order: [["id", "DESC"]],
      }),

      Referral.findAll({
        limit: 10,
        order: [["id", "DESC"]],
      }),

      Campaign.findAll({
        order: [["id", "DESC"]],
      }),

      BusinessHackVideo.findAll({
        limit: 6,
        order: [["id", "DESC"]],
      }),

      InHacks.findAll({
        limit: 6,
        order: [["id", "DESC"]],
      }),

      InfluencerUser.count(),

      BusinessRegistration.count(),
    ]);

    /* ================= CONVERT IDS TO STRING ================= */

    const bannerList = convertIdToString(banners).map((banner) => ({
      ...banner,
      image: `${baseUrl}/${banner.image}`,
    }));

    const topReferrals = convertIdToString(referrals);

    const campaignList = convertIdToString(campaigns).map((campaign) => ({
      ...campaign,

      totalInfluencersNeeded:
        campaign.totalInfluencersNeeded !== null
          ? String(campaign.totalInfluencersNeeded)
          : null,

      minimumFollowers:
        campaign.minimumFollowers !== null
          ? String(campaign.minimumFollowers)
          : null,
    }));

    const videoList = convertIdToString(businessVideos).map((video) => ({
      ...video,
      thumbnail: video.thumbnail ? `${baseUrl}/${video.thumbnail}` : null,
      video_url: video.video_url ? `${baseUrl}/${video.video_url}` : null,
    }));

    const inhacksList = convertIdToString(inhacksVideos).map((video) => ({
      ...video,
      thumbnail: video.thumbnail ? `${baseUrl}/${video.thumbnail}` : null,
      video_url: video.video_url ? `${baseUrl}/${video.video_url}` : null,
    }));

    /* ================= SPLIT CAMPAIGNS ================= */

    const paidCampaigns = campaignList.filter((c) => c.campaignType === "Paid");

    const barterCampaigns = campaignList.filter(
      (c) => c.campaignType === "Barter"
    );

    /* ================= TOTAL CAMPAIGN ================= */

    const totalCampaign = influencerCount + businessCount;

    res.status(200).json({
      response: {
        success: true,
        message: "Influencer dashboard fetched successfully",
        banners: bannerList,
        active_users: influencerCount.toString(),
        total_campaign: totalCampaign.toString(),
        top_referrals: topReferrals,
        paid_campaigns: paidCampaigns,
        barter_campaigns: barterCampaigns,
        business_hacks_videos: videoList,
        inhacks_videos: inhacksList
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
      stack: error.stack,
    });
  }
};