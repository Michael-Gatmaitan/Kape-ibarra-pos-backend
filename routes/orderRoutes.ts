import express, { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
} from "../controllers/orders/orderController";

const router: Router = express.Router();

router.get("/", getAllOrders);
router.post("/", createOrder);
// router.put("/", updateOrder);
// router.delete("/", deleteOrder);
router.get("/:id", getOrderById);

export default router;
