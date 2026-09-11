import express from "express";

import {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../Controler/orderController.js";

const router = express.Router();

router.post("/", addOrder);

router.get("/", getAllOrders);

router.get("/:id", getOrderById);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

export default router;