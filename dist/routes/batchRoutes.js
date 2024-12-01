"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const batchController_1 = require("../controllers/batch/batchController");
const router = express_1.default.Router();
router.get("/", batchController_1.getAllBatch);
router.post("/", batchController_1.createBatch);
exports.default = router;
