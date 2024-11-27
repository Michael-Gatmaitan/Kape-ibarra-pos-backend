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
exports.createEmployee = exports.getEmployeeById = exports.getAllEmployee = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../../config/db"));
const router = express_1.default.Router();
/**
 * firstname, lastname, username, password, cpNum, roleId
 */
const getAllEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fullInfo = req.query.fullInfo;
    try {
        const employees = yield db_1.default.employee.findMany({
            include: {
                role: fullInfo === "true",
            },
        });
        res.json(employees);
    }
    catch (err) {
        res.json({ error: `There was an error getting all employee: ${err}` });
    }
});
exports.getAllEmployee = getAllEmployee;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const order = req.query.order;
    const role = req.query.role;
    if (!id) {
        res.json({ message: "ID parameter is missing in url" });
        return;
    }
    try {
        const result = yield db_1.default.employee.findFirst({
            where: { id },
            include: {
                orders: order === "true",
                role: role === "true",
            },
        });
        res.json(result);
    }
    catch (err) {
        res.json({
            message: `There was an error getting employee by id of: ${id}, err: ${err}`,
        });
    }
});
exports.getEmployeeById = getEmployeeById;
// Create new employee using { req.body } if validated on frontend
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // const body: { username: string; password: string } = req.body;
    const newEmployee = yield db_1.default.employee.create({
        data: body,
    });
    if (!newEmployee.id) {
        res.json({ error: "Creation of new employee failed." });
    }
    res.json({ newEmployee });
});
exports.createEmployee = createEmployee;
// Get specific employee
// router.get(
//   "/:name",
//   (req: Request & { params: { name: string } }, res: Response) => {
//     res.json({ res: `employee's name is ${req.params.name}` });
//   }
// );
// export default router;
