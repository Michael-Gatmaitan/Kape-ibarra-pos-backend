"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenForCustomer = exports.generateTokenForCustomer = exports.verifyToken = exports.generateToken = void 0;
const db_1 = __importDefault(require("../config/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY;
const generateToken = (person) => __awaiter(void 0, void 0, void 0, function* () {
    if ("roleId" in person) {
        const roleName = (yield db_1.default.role.findFirstOrThrow({ where: { id: person.roleId } })).roleName;
        return jsonwebtoken_1.default.sign({ person, roleName }, SECRET_KEY);
    }
    else {
        return jsonwebtoken_1.default.sign({ person, roleName: "customer" }, SECRET_KEY);
    }
});
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(401).json({ error: "Access denied" });
        return;
    }
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (error, decoded) => {
        if (error)
            res.status(403).json({ error: "Invalid  token" });
        console.log("Validated");
        next();
    });
};
exports.verifyToken = verifyToken;
const generateTokenForCustomer = (customer) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({ customer }, SECRET_KEY);
});
exports.generateTokenForCustomer = generateTokenForCustomer;
const verifyTokenForCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(401).json({ error: "Access denied" });
        return;
    }
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (error, decoded) => {
        if (error)
            res.status(403).json({ error: "Access denied" });
        console.log("Customer validated");
        next();
    });
});
exports.verifyTokenForCustomer = verifyTokenForCustomer;
