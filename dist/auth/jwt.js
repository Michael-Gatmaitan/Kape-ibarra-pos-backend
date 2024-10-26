"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY;
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id.toString(), role: user.roleId.toString() }, SECRET_KEY);
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token)
        return res.status(401).json({ error: "Access denied" });
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (error, decoded) => {
        if (error)
            return res.status(403).json({ error: "Invalid  token" });
    });
};
exports.verifyToken = verifyToken;
