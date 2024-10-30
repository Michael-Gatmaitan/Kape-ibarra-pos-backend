import express, { Router } from "express";
import { createOrder } from "../controllers/orders/orderController";

const router: Router = express.Router();

router.post("/", createOrder);
// router.put("/", updateOrder);
// router.delete("/", deleteOrder);

export default router;
