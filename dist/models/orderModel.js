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
exports.getOrderByEmployeeId = exports.getOrderByOrderStatus = exports.getLastOrder = void 0;
const db_1 = __importDefault(require("../config/db"));
// OrderItem and Orders will implemented here
// We will base all of the id on USER eg cashier
// ? Multiple orderItems in 1 order
// Get
const getLastOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield db_1.default.order.findMany({
        orderBy: {
            customerNumber: "desc",
        },
        take: 1,
    });
    return order;
});
exports.getLastOrder = getLastOrder;
const getOrderByOrderStatus = (orderStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield db_1.default.order.findMany({
        where: { orderStatus },
    });
    return orders;
});
exports.getOrderByOrderStatus = getOrderByOrderStatus;
const getOrderByEmployeeId = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield db_1.default.order.findMany({
        where: { employeeId },
    });
    return orders;
});
exports.getOrderByEmployeeId = getOrderByEmployeeId;
// Single or multiple orderItems for single order
// export const createOrderWithOrderItems = async ({
//   branchId,
//   userId,
//   orderItems,
// }: ICreateOrderBody) => {
//   });
//   console.log(newOrder);
//   return newOrder;
// };
