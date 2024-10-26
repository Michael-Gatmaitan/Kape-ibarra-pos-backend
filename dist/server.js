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
const express_1 = __importStar(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const orderController_1 = require("./controllers/orders/orderController");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
const PORT = process.env.PORT || 9999;
router
    .route("/order")
    .get(orderController_1.readOrder)
    .post(orderController_1.createOrder)
    .patch(orderController_1.updateOrder)
    .delete(orderController_1.deleteOrder);
app.use(router);
// send get req in home
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    res.status(200).json(users);
}));
app.post("/create-user", () => __awaiter(void 0, void 0, void 0, function* () {
    const newBranch = yield prisma.branch.create({
        data: {
            streetAddress: "8 JC st.",
            baranggay: "pob 2",
            city: "marilao",
            zipCode: 3019,
            // user: {
            //   create: {
            //     firstname: "Michael Gatmaitan"
            //   }
            // }
        },
    });
    // return res.send({ message: "User created successfully", status: 200 });
}));
// Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
    next(err);
});
app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
});
