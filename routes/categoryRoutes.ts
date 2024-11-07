import express, { Router } from "express";
import {
  createCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategoryById,
} from "../controllers/category/categoryController";

const router: Router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
// router.put("/", updateCategoryById);
// router.delete("/", deleteCategoryById);

router.get("/:id", getCategoryById);
router.delete("/:id", deleteCategoryById);
router.put("/:id", updateCategoryById);

export default router;
