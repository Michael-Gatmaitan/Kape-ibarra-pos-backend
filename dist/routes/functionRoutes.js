"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const functionController_1 = require("../controllers/functions/functionController");
const router = express_1.default.Router();
router.get("/calculate_order_amount", functionController_1.calculateOrderAmount);
exports.default = router;
