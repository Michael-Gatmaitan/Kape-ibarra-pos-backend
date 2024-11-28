import express, { Router } from "express";
import { createBatch, getAllBatch } from "../controllers/batch/batchController";

const router: Router = express.Router();

router.get("/", getAllBatch);
router.post("/", createBatch);

export default router;
