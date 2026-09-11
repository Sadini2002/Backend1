import express from "express";

import {
  addTechPartItem,
  getAllTechPartItems,
  getTechPartItemById,
  updateTechPartItem,
  deleteTechPartItem,
} from "../Controler/techPartItemController.js";

const router = express.Router();

router.post("/", addTechPartItem);

router.get("/", getAllTechPartItems);

router.get("/:id", getTechPartItemById);

router.put("/:id", updateTechPartItem);

router.delete("/:id", deleteTechPartItem);

export default router;