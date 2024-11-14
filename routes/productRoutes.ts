import express, { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getProducts,
  getProductById,
  updateProductById,
} from "../controllers/product/productController";
// import { verifyToken } from "../auth/jwt";

const router: Router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
// router.put("/", updateOrder);
// router.delete("/", deleteOrder);

router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);
router.put("/:id", updateProductById);

export default router;
