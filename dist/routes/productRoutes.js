"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/product/productController");
const router = express_1.default.Router();
router.get("/", productController_1.getProducts);
router.post("/", productController_1.createProduct);
// router.put("/", updateOrder);
// router.delete("/", deleteOrder);
router.get("/:id", productController_1.getProductById);
router.delete("/:id", productController_1.deleteProductById);
router.put("/:id", productController_1.updateProductById);
exports.default = router;
