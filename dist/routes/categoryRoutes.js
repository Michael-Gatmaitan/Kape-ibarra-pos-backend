"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/category/categoryController");
const router = express_1.default.Router();
router.get("/", categoryController_1.getCategories);
router.post("/", categoryController_1.createCategory);
// router.put("/", updateCategoryById);
// router.delete("/", deleteCategoryById);
router.get("/:id", categoryController_1.getCategoryById);
router.delete("/:id", categoryController_1.deleteCategoryById);
router.put("/:id", categoryController_1.updateCategoryById);
exports.default = router;
