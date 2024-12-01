"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("./api"));
// Export the handler that integrates with Vercel
exports.default = (req, res) => {
    // Use Express to handle the incoming request
    (0, api_1.default)(req, res);
};
