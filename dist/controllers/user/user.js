"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Get all user
router.get("/", (req, res) => {
    res.json({ res: req.params.name });
});
// Create new user using { req.body } if validated on frontend
router.post("/", (req, res) => {
    const body = req.body;
    console.log(body);
    res.json({ res: body });
});
// Get specific user
router.get("/:name", (req, res) => {
    res.json({ res: `user's name is ${req.params.name}` });
});
exports.default = router;
