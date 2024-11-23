"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerController_1 = require("../controllers/customer/customerController");
const router = express_1.default.Router();
router.get("/", customerController_1.getAllCustomers);
router.get("/:id", customerController_1.getCustomerById);
exports.default = router;
