import express, { Router } from "express";
import { getSales } from "../controllers/sale/saleController";

const router: Router = express.Router();

router.get("/", getSales);

export default router;
