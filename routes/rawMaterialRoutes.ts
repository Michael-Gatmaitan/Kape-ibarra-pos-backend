import express, { Router } from "express";
import {
  createRawMaterial,
  deleteRawMaterialById,
  getRawMaterialById,
  getRawMaterials,
  updateRawMaterialById,
} from "../controllers/rawMaterial/rawMaterialController";

const router: Router = express.Router();

router.get("/", getRawMaterials);
router.post("/", createRawMaterial);

router.get("/:id", getRawMaterialById);
router.put("/:id", updateRawMaterialById);
router.delete("/:id", deleteRawMaterialById);

export default router;
