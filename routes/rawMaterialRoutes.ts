import express, { Router } from "express";
import { getRawMaterials } from "../controllers/rawMaterial/rawMaterialController";

const router: Router = express.Router();

router.get("/", getRawMaterials);

export default router;
