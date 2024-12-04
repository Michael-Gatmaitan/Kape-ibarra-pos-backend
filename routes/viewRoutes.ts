import express, { Router } from "express";
import { getTotalOrders } from "../controllers/views/viewsController";

const router: Router = express.Router();

router.get("/total-orders", getTotalOrders);

export default router;
