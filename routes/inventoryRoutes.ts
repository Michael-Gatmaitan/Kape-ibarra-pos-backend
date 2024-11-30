import express, { Router } from "express";
import { getAllInventory } from "../controllers/inventory/inventoryController";

const router: Router = express.Router();

router.get("/", getAllInventory);

export default router;
