import express, { Router } from "express";
import {
  createBranch,
  deleteBranchById,
  getBranchById,
  getBranches,
  updateBranchById,
} from "../controllers/branch/branchController";

const router: Router = express.Router();

router.get("/", getBranches);
router.post("/", createBranch);

router.get("/:id", getBranchById);
router.put("/:id", updateBranchById);
router.delete("/:id", deleteBranchById);

export default router;
