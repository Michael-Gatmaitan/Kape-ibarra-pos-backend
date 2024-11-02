import express, { Router } from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/category/categoryController";

const router: Router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
// router.put("/", updateOrder);
// router.delete("/", deleteOrder);

export default router;
