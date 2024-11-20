"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rawMaterialController_1 = require("../controllers/rawMaterial/rawMaterialController");
const router = express_1.default.Router();
router.get("/", rawMaterialController_1.getRawMaterials);
router.post("/", rawMaterialController_1.createRawMaterial);
router.get("/:id", rawMaterialController_1.getRawMaterialById);
router.put("/:id", rawMaterialController_1.updateRawMaterialById);
router.delete("/:id", rawMaterialController_1.deleteRawMaterialById);
exports.default = router;
