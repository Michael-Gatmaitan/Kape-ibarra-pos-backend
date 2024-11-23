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
exports.createTransactionModel = void 0;
const db_1 = __importDefault(require("../config/db"));
const createTransactionModel = (_a) => __awaiter(void 0, [_a], void 0, function* ({ orderId, change, paymentMethod, totalAmount, totalTendered, }) {
    const newTransaction = yield db_1.default.transaction.create({
        data: {
            orderId,
            change,
            paymentMethod,
            totalAmount,
            totalTendered,
        },
    });
    return newTransaction;
});
exports.createTransactionModel = createTransactionModel;