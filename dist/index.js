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
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const orderRoute = require("./routes/orderRoutes.js");
// const { PrismaClient } = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// const router = express.Router();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
const PORT = process.env.PORT || 9999;
// app.use("/order", orderRoute);
// send get req in home
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const users = await prisma.user.findMany();
    const users = [{ name: "Micjael", age: 22 }];
    res.status(200).json(users);
}));
app.post("/create-user", () => __awaiter(void 0, void 0, void 0, function* () {
    // const newBranch = await prisma.branch.create({
    //   data: {
    //     streetAddress: "8 JC st.",
    //     baranggay: "pob 2",
    //     city: "marilao",
    //     zipCode: 3019,
    //     // user: {
    //     //   create: {
    //     //     firstname: "Michael Gatmaitan"
    //     //   }
    //     // }
    //   },
    // });
    // return res.send({ message: "User created successfully", status: 200 });
}));
// Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
//   next(err);
// })
app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
});
