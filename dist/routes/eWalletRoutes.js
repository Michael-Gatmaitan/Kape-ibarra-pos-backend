"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eWalletController_1 = require("../controllers/e-wallet/eWalletController");
const router = express_1.default.Router();
router.get("/", eWalletController_1.getEWallet);
router.put("/", eWalletController_1.updateEWallet);
exports.default = router;
