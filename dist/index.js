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
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const roleRoutes_1 = __importDefault(require("./routes/roleRoutes"));
const rawMaterialRoutes_1 = __importDefault(require("./routes/rawMaterialRoutes"));
const recipeRoutes_1 = __importDefault(require("./routes/recipeRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const db_1 = __importDefault(require("./config/db"));
const jwt_1 = require("./auth/jwt");
// import { generateToken } from "./auth/jwt";
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
io.on("connection", (socket) => console.log("Connected: ", socket.id));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
dotenv_1.default.config();
// const PORT = process.env.PORT || 9999;
app.get("/", (req, res) => {
    res.json("Hello world");
});
app.use("/user", userRoutes_1.default);
app.use("/product", productRoutes_1.default);
app.use("/category", categoryRoutes_1.default);
app.use("/order", orderRoutes_1.default);
app.use("/role", roleRoutes_1.default);
app.use("/raw-material", rawMaterialRoutes_1.default);
app.use("/recipe", recipeRoutes_1.default);
app.use("/user", userRoutes_1.default);
// (async function () {
// const role = await prisma.role.findFirst({
//   where: {
//     roleName: { in: ["Admin", "Manager", "Cashier", "Barista"] },
//   },
// });
// if (!role?.id) {
//   await prisma.role.createMany({
//     data: [
//       { roleName: "Admin" },
//       { roleName: "Manager" },
//       { roleName: "Cashier" },
//       { roleName: "Barista" },
//     ],
//   });
//   console.log("Roles created");
// }
// const branch = await prisma.branch.findFirst();
//
// if (!branch?.id) {
//   await prisma.branch.create({
//     data: {
//       streetAddress: "Avocado St.",
//       baranggay: "Sta. Rosa I",
//       city: "Marilao",
//       zipCode: 3019,
//       province: "Bulacan",
//       contactNumber: "09123456789",
//       region: "Region III",
//
//       users: {
//         create: {
//           firstname: "Michael",
//           lastname: "Gatmaitan",
//           username: "mikael",
//           password: "michealgatmaitan",
//           cpNum: "09499693314",
//
//           role: {
//             create: {
//               roleName: "System Admin",
//             },
//           },
//         },
//       },
//     },
//   });
//
//   console.log("Branch with user & role created");
// }
// const user = await prisma.user.findFirst();
// if (!user?.id) {
//   await prisma.user.create({
//     data: {
//       firstname: "Michael",
//       lastname: "Gatmaitan",
//       password: "michealgatmaitan",
//       username: "micheal29",
//       cpNum: "09499693314",
//       roleId: "090909",
//       imagePath: "",
//     },
//   });
// }
// const product = await prisma.product.findFirst();
// if (!product?.id) {
//   await prisma.product.create({
//     data: {
//       productName: "Cafe latte",
//       description: "Sample description",
//       price: 90,
//       category: {
//         create: {
//           categoryName: "Coffee",
//         },
//       },
//     },
//   });
//   console.log("Product created");
// }
// const rawMaterials = await prisma.rawMaterial.findFirst();
// if (!rawMaterials?.id) {
//   await prisma.rawMaterial.createMany({
//     data: [
//       { materialName: "Milk", quantityInUnitPerItem: 1000, rawPrice: 100 },
//       {
//         materialName: "Coffee grounds",
//         quantityInUnitPerItem: 1000,
//         rawPrice: 800,
//       },
//       {
//         materialName: "Whip Cream",
//         quantityInUnitPerItem: 1000,
//         rawPrice: 120,
//       },
//       { materialName: "Cups", quantityInUnitPerItem: 50, rawPrice: 50 },
//       { materialName: "Straw", quantityInUnitPerItem: 50, rawPrice: 50 },
//       { materialName: "Water", quantityInUnitPerItem: 5000, rawPrice: 30 },
//     ],
//   });
//   console.log("Raw materials created");
// }
// })();
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = yield db_1.default.user.findFirst({
        where: {
            username: body.username,
            password: body.password,
        },
    });
    if (user === null) {
        res.json({ error: "User could not find" }).status(401);
        return;
    }
    const token = yield (0, jwt_1.generateToken)(user);
    res.json({ token });
}));
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const newUser = yield db_1.default.user.create({
        data: body,
    });
    console.log(newUser);
    res.json(newUser);
}));
app.listen(9999, () => {
    console.log(`Connected to port ${9999}`);
});
module.exports = app;
