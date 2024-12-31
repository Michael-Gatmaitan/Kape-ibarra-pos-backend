"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Routes
const orderRoutes_1 = __importDefault(require("../routes/orderRoutes"));
const productRoutes_1 = __importDefault(require("../routes/productRoutes"));
const categoryRoutes_1 = __importDefault(require("../routes/categoryRoutes"));
const roleRoutes_1 = __importDefault(require("../routes/roleRoutes"));
const rawMaterialRoutes_1 = __importDefault(require("../routes/rawMaterialRoutes"));
const recipeRoutes_1 = __importDefault(require("../routes/recipeRoutes"));
const employeeRoutes_1 = __importDefault(require("../routes/employeeRoutes"));
const transactionRoutes_1 = __importDefault(require("../routes/transactionRoutes"));
const customerRoutes_1 = __importDefault(require("../routes/customerRoutes"));
const batchRoutes_1 = __importDefault(require("../routes/batchRoutes"));
const inventoryRoutes_1 = __importDefault(require("../routes/inventoryRoutes"));
const auditLogRoutes_1 = __importDefault(require("../routes/auditLogRoutes"));
const eWalletRoutes_1 = __importDefault(require("../routes/eWalletRoutes"));
const viewRoutes_1 = __importDefault(require("../routes/viewRoutes"));
const functionRoutes_1 = __importDefault(require("../routes/functionRoutes"));
const saleRoutes_1 = __importDefault(require("../routes/saleRoutes"));
const db_1 = __importDefault(require("../config/db"));
const jwt_1 = require("../auth/jwt");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const triggers_1 = require("../prisma/triggers");
const functions_1 = require("../prisma/functions");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
dotenv.config();
const PORT = process.env.PORT;
console.log("POERT: ", PORT);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield db_1.default.product.findMany();
    res.json(products);
}));
(0, triggers_1.setupTrigger)();
(0, functions_1.setupFunctions)();
// authMiddleware(["admin", "customer"])
app.use("/product", authMiddleware_1.auth, productRoutes_1.default);
app.use("/category", authMiddleware_1.auth, categoryRoutes_1.default);
app.use("/order", authMiddleware_1.auth, orderRoutes_1.default);
app.use("/role", authMiddleware_1.auth, roleRoutes_1.default);
app.use("/raw-material", authMiddleware_1.auth, rawMaterialRoutes_1.default);
app.use("/recipe", authMiddleware_1.auth, recipeRoutes_1.default);
app.use("/employee", authMiddleware_1.auth, employeeRoutes_1.default);
app.use("/transaction", authMiddleware_1.auth, transactionRoutes_1.default);
app.use("/customer", authMiddleware_1.auth, customerRoutes_1.default);
app.use("/batch", authMiddleware_1.auth, batchRoutes_1.default);
app.use("/inventory", authMiddleware_1.auth, inventoryRoutes_1.default);
app.use("/audit-log", authMiddleware_1.auth, auditLogRoutes_1.default);
app.use("/ewallet", authMiddleware_1.auth, eWalletRoutes_1.default);
app.use("/view", authMiddleware_1.auth, viewRoutes_1.default);
app.use("/function", functionRoutes_1.default);
app.use("/sale", authMiddleware_1.auth, saleRoutes_1.default);
// (async function () {
// seed
// })();
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const loginType = req.query.loginType;
    if (!loginType) {
        res.json({ error: "Login type indvalid" });
        return;
    }
    try {
        if (loginType === "employee") {
            const employee = yield db_1.default.employee.findFirst({
                where: {
                    username: body.username,
                    password: body.password,
                },
            });
            if (employee === null) {
                res.json({ error: "User could not find: employee" }).status(401);
                return;
            }
            const token = yield (0, jwt_1.generateToken)(employee);
            res.json({ token });
        }
        else if (loginType === "customer") {
            const customer = yield db_1.default.customer.findFirst({
                where: {
                    username: body.username,
                    password: body.password,
                },
            });
            if (customer === null) {
                res.json({ error: "User could not find: customer" }).status(401);
                return;
            }
            const token = yield (0, jwt_1.generateToken)(customer);
            console.log("Token for customer", token);
            res.json({ token });
        }
    }
    catch (err) {
        res.json({ message: `There was an error logging in: ${err}` });
    }
}));
app.post("/create-customer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { username } = req.body;
    try {
        const customerExisted = yield db_1.default.customer.findFirst({
            where: { username },
        });
        if (customerExisted === null || customerExisted === void 0 ? void 0 : customerExisted.id) {
            res.json({ message: `Username already exists` }).status(401);
        }
        const newCustomer = yield db_1.default.customer.create({
            data: body,
        });
        console.log("New customer created: ", newCustomer);
        res.json(newCustomer);
    }
    catch (err) {
        const message = `There was an error creating new customer: ${err}`;
        console.log(message);
        res.json({ message }).status(401);
    }
}));
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const newEmployee = yield db_1.default.employee.create({
        data: body,
    });
    console.log(newEmployee);
    res.json(newEmployee);
}));
app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
});
exports.default = app;
