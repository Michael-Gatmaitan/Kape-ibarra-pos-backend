"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orders/orderController");
const router = express_1.default.Router();
router.get("/", orderController_1.getAllOrders);
router.post("/", orderController_1.createOrder);
// router.put("/", updateOrder);
// router.delete("/", deleteOrder);
router.put("/:id", orderController_1.updateOrderById);
router.get("/:id", orderController_1.getOrderById);
exports.default = router;
