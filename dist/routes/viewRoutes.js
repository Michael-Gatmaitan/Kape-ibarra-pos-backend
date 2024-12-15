"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const viewsController_1 = require("../controllers/views/viewsController");
const router = express_1.default.Router();
router.get("/total-orders", viewsController_1.getTotalOrders);
exports.default = router;
