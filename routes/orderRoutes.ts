import express, { Router } from "express";
import {
  createOrder,
  deleteOrder,
  readOrder,
  updateOrder,
} from "../controllers/orders/orderController";

const router: Router = express.Router();

router.get("/", readOrder);
router.post("/", createOrder);
router.put("/", updateOrder);
router.delete("/", deleteOrder);

export default router;
