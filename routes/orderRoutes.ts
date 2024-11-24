import express, { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
} from "../controllers/orders/orderController";

const router: Router = express.Router();

router.get("/", getAllOrders);
router.post("/", createOrder);
// router.put("/", updateOrder);
// router.delete("/", deleteOrder);
router.put("/:id", updateOrderById);
router.get("/:id", getOrderById);

export default router;
