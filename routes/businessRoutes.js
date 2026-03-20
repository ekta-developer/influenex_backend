import express from "express";
import {
  createBusiness,
  getAllBusinesses,
  updateBusiness,
  deleteBusiness,
  getBusinessByUUID,
} from "../controller/businessController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/register", createBusiness);
router.get("/",verifyToken, getAllBusinesses);
router.get("/:uuid",verifyToken, getBusinessByUUID);
router.put("/:uuid",verifyToken, updateBusiness);
router.delete("/:uuid",verifyToken, deleteBusiness);

export default router;
