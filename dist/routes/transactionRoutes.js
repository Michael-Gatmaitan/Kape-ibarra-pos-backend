"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transaction/transactionController");
const route = express_1.default.Router();
// get transaction
route.get("/", transactionController_1.getAllTransaction);
// get transaction by its id
route.get("/:id", transactionController_1.getTransactionById);
// update
route.put("/:id", transactionController_1.updateTransactionById);
exports.default = route;
