"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeController_1 = require("../controllers/user/employeeController");
const route = express_1.default.Router();
route.post("/", employeeController_1.createEmployee);
route.get("/", employeeController_1.getAllEmployee);
route.get("/:id", employeeController_1.getEmployeeById);
exports.default = route;
