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
exports.getCustomerById = exports.getAllCustomers = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getAllCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield db_1.default.customer.findMany({
            select: {
                id: true,
                firstname: true,
                lastname: true,
                username: true,
            },
        });
        res.json(customers);
    }
    catch (err) {
        res
            .json({ message: `There was an error getting all customers: ${err}` })
            .status(401);
    }
});
exports.getAllCustomers = getAllCustomers;
const getCustomerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const customer = yield db_1.default.customer.findFirst({ where: { id } });
        if (!customer) {
            res.json({ message: `No customer with ${id} was found` }).status(401);
            return;
        }
        res.json(customer);
    }
    catch (err) {
        res
            .json({ message: `There was an error getting customer by id: ${err}` })
            .status(401);
    }
});
exports.getCustomerById = getCustomerById;
