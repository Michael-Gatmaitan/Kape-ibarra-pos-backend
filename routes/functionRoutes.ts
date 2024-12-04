import express, { Router } from "express";
import { calculateOrderAmount } from "../controllers/functions/functionController";

const router: Router = express.Router();

router.get("/calculate_order_amount", calculateOrderAmount);

export default router;
