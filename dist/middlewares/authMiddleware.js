"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.auth = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY;
function authMiddleware(requiredRole) {
    return (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).send("Unauthorized");
            return;
        }
        jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).send("Invalid token");
                return;
            }
            const payload = decoded;
            if (!requiredRole.includes(payload === null || payload === void 0 ? void 0 : payload.roleName)) {
                res.status(403).send("Forbidden");
                return;
            }
            // req["user"] = payload;
            next();
        });
    };
}
function auth(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
        var _a;
        if (err) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
        const payload = decoded;
        if (!((_a = payload === null || payload === void 0 ? void 0 : payload.person) === null || _a === void 0 ? void 0 : _a.id)) {
            res.status(403).json({ message: "Forbidden" });
        }
        // console.log("User valid: ", payload);
        next();
    });
}
