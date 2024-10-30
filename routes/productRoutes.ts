import express, { Router } from "express";
import { createProduct } from "../controllers/product/productController";

const router: Router = express.Router();

// router.get("/", readOrder);
router.post("/", createProduct);
// router.put("/", updateOrder);
// router.delete("/", deleteOrder);

export default router;
