import express, { Router } from "express";
import { getRecipeByProductId } from "../controllers/recipe/recipeController";

const router = express.Router();

router.get("/", getRecipeByProductId);

export default router;
