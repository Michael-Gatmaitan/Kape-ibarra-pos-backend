import express, { Router } from "express";
import {
  createBranch,
  getBranches,
} from "../controllers/branch/branchController";

const router: Router = express.Router();

router.get("/", getBranches);
router.post("/", createBranch);

export default router;
