import express, { Router } from "express";
import {
  getDailySales,
  getOrderSales,
} from "../controllers/analytic/analyticController";

const router: Router = express.Router();

router.get("/daily-sales", getDailySales);
router.get("/orders", getOrderSales);
