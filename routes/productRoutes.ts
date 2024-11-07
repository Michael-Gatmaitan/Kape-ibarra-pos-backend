import express, { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getOrders,
  getProductById,
  updateProductById,
} from "../controllers/product/productController";
import { verifyToken } from "../auth/jwt";

const router: Router = express.Router();

router.get("/", getOrders);
router.post("/", verifyToken, createProduct);
// router.put("/", updateOrder);
// router.delete("/", deleteOrder);

router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);
router.put("/:id", updateProductById);

export default router;
