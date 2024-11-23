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
exports.deleteEmployeeById = exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getAllEmployee = void 0;
const db_1 = __importDefault(require("../config/db"));
// Get
const getAllEmployee = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.employee.findMany();
});
exports.getAllEmployee = getAllEmployee;
const getEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.employee.findFirst({
        where: { id },
    });
});
exports.getEmployeeById = getEmployeeById;
// Create
const createEmployee = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.employee.create({
        data,
    });
});
exports.createEmployee = createEmployee;
// Update
const updateEmployee = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.employee.update({
        where: { id },
        data,
    });
});
exports.updateEmployee = updateEmployee;
// Delete
const deleteEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.employee.delete({
        where: { id },
    });
});
exports.deleteEmployeeById = deleteEmployeeById;
