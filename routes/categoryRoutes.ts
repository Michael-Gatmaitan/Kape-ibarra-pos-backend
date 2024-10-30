import express, { Router } from "express";
import { createCategory } from "../controllers/category/categoryController";

const router: Router = express.Router();

// router.get("/", readOrder);
router.post("/", createCategory);
// router.put("/", updateOrder);
// router.delete("/", deleteOrder);

export default router;
