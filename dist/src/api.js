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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
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
const db_1 = __importDefault(require("../config/db"));
const jwt_1 = require("../auth/jwt");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
dotenv_1.default.config();
const PORT = process.env.PORT || 9999;
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield db_1.default.product.findMany();
    res.json(products);
}));
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
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const role = yield db_1.default.role.findFirst({
            where: {
                roleName: { in: ["Cashier", "Barista", "Customer"] },
            },
        });
        if (!(role === null || role === void 0 ? void 0 : role.id)) {
            yield db_1.default.role.createMany({
                data: [
                    { roleName: "Manager" },
                    { roleName: "Cashier" },
                    { roleName: "Barista" },
                ],
            });
            console.log("Roles created");
        }
        const systemPh = yield db_1.default.employee.findFirst({
            where: { id: "c65b9c9c-c016-4ef7-bfc6-c631cb7eaa9e" },
        });
        if (!systemPh) {
            yield db_1.default.employee.create({
                data: {
                    id: "c65b9c9c-c016-4ef7-bfc6-c631cb7eaa9e",
                    firstname: "System",
                    lastname: "System",
                    phoneNumber: "System",
                    imagePath: "",
                    username: "sys",
                    password: "sys",
                    role: {
                        create: {
                            roleName: "System",
                        },
                    },
                },
            });
        }
        const employee = yield db_1.default.employee.findFirst({
            where: { username: "micheal29" },
        });
        if (!(employee === null || employee === void 0 ? void 0 : employee.id)) {
            yield db_1.default.employee.create({
                data: {
                    firstname: "Michael",
                    lastname: "Gatmaitan",
                    username: "micheal29",
                    password: "michealgatmaitan",
                    phoneNumber: "09499693314",
                    role: {
                        create: {
                            roleName: "Admin",
                        },
                    },
                    imagePath: "",
                },
            });
        }
        // Sample customer
        const customer = yield db_1.default.customer.findFirst();
        if (!customer) {
            yield db_1.default.customer.create({
                data: {
                    email: "fidelrevo@gmail.com",
                    firstname: "Fidel",
                    lastname: "Revo",
                    username: "remvo123",
                    password: "fidelrevo123",
                    phoneNumber: "09123456789",
                    gender: "Male",
                },
            });
        }
        const category = yield db_1.default.category.findFirst();
        if (!category) {
            yield db_1.default.category.createMany({
                data: [
                    { categoryName: "Coffee" },
                    { categoryName: "Non-Coffee" },
                    { categoryName: "Milk tea" },
                ],
            });
        }
        const rawMaterials = yield db_1.default.rawMaterial.findFirst();
        if (!(rawMaterials === null || rawMaterials === void 0 ? void 0 : rawMaterials.id)) {
            yield db_1.default.rawMaterial.createMany({
                data: [
                    { materialName: "Milk", quantityInUnitPerItem: 1000, rawPrice: 100 },
                    {
                        materialName: "Coffee grounds",
                        quantityInUnitPerItem: 1000,
                        rawPrice: 800,
                    },
                    {
                        materialName: "Whip Cream",
                        quantityInUnitPerItem: 1000,
                        rawPrice: 120,
                    },
                    { materialName: "Cups", quantityInUnitPerItem: 50, rawPrice: 50 },
                    { materialName: "Straw", quantityInUnitPerItem: 50, rawPrice: 50 },
                    { materialName: "Water", quantityInUnitPerItem: 5000, rawPrice: 30 },
                ],
            });
            console.log("Raw materials created");
        }
    });
})();
// app.post("/customer-login", (req: Request, res: Response) => {
//   const body: { username: string; password: string } = req.body;
// });
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
        res.json({ message: "There was an error logging in" });
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
// app.listen(PORT, () => {
//   console.log(`Connected to port ${PORT}`);
// });
exports.default = app;
