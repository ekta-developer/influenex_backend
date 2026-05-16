import BusinessHack from "./BusinessHacks.js";
import BusinessHackDetail from "./BusinessHackDetail.js";
import BusinessHackStep3 from "./BusinessHackDetail2.js";
import BusinessHackStep4 from "./BusinessHackStep4.js";

// ================= ASSOCIATIONS =================

BusinessHack.hasOne(BusinessHackDetail, {
  foreignKey: "businessHackId",
  as: "business_hack_details",
});

BusinessHack.hasOne(BusinessHackStep3, {
  foreignKey: "businessHackId",
  as: "business_hack_step3",
});

BusinessHack.hasOne(BusinessHackStep4, {
  foreignKey: "businessHackId",
  as: "business_hack_step4",
});

// CHILD → PARENT

BusinessHackDetail.belongsTo(BusinessHack, {
  foreignKey: "businessHackId",
});

BusinessHackStep3.belongsTo(BusinessHack, {
  foreignKey: "businessHackId",
});

BusinessHackStep4.belongsTo(BusinessHack, {
  foreignKey: "businessHackId",
});

export {
  BusinessHack,
  BusinessHackDetail,
  BusinessHackStep3,
  BusinessHackStep4,
};