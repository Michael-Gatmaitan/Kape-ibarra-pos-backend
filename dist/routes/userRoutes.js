"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/user/userController");
const route = express_1.default.Router();
route.post("/", userController_1.createUser);
route.get("/", userController_1.getAllUsers);
route.get("/:id", userController_1.getUserById);
exports.default = route;
