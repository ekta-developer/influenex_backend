import express from "express";
import {
  createInhack,
  getAllInhacks,
  getSingleInhack,
  updateInhack,
  deleteInhack,
} from "../controller/inhacksController.js";

const router = express.Router();

router.post("/create", createInhack);
router.get("/list", getAllInhacks);
router.get("/:id", getSingleInhack);
router.put("/update/:id", updateInhack);
router.delete("/delete/:id", deleteInhack);

export default router;