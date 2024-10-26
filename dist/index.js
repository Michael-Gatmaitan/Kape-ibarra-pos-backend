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
const client_1 = require("@prisma/client");
// import orderRoute from "./routes/orderRoutes";
// import userRouter from "./controllers/user/user";
// import { IUser } from "./types/types";
const jwt_1 = require("./auth/jwt");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
const PORT = process.env.PORT || 9999;
// app.use("/order", orderRoute);
// app.use("/user", userRouter);
// Setup initial db
// Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
//   next(err);
// })
app.use("/", (_, res) => {
    res.send("hgotdog ni michael");
});
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = yield prisma.user.findFirst({
        where: {
            username: body.username,
            password: body.password,
        },
    });
    if (user === null) {
        res.json({ error: "User could not find" }).status(401);
        return;
    }
    const generated = (0, jwt_1.generateToken)(user);
    res.json({ token: generated });
    // console.log(req.headers["authorization"]);
    // return both generatedKey and
}));
app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
});
