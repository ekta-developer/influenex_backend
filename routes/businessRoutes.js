import express from "express";
import {
  createBusiness,
  getAllBusinesses,
  getBusinessByUUID,
  updateBusiness,
  deleteBusiness,
} from "../controller/businessController.js"
const router = express.Router();

router.post("/register", createBusiness);
router.get("/", getAllBusinesses);
router.get("/:id", getBusinessByUUID);
router.put("/:id", updateBusiness);
router.delete("/:id", deleteBusiness);

export default router;