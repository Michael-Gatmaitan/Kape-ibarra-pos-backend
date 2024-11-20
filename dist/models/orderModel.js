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
exports.updateOrder = exports.updateOrderItem = exports.deleteOrderItem = exports.getOrderItemsById = exports.getOrderItems = void 0;
const db_1 = __importDefault(require("../config/db"));
// OrderItem and Orders will implemented here
// We will base all of the id on USER eg cashier
// ? Multiple orderItems in 1 order
// Get
const getOrderItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.orderItem.findMany();
});
exports.getOrderItems = getOrderItems;
const getOrderItemsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.orderItem.findFirst({ where: { id } });
});
exports.getOrderItemsById = getOrderItemsById;
// Delete
const deleteOrderItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.orderItem.delete({ where: { id } });
});
exports.deleteOrderItem = deleteOrderItem;
const updateOrderItem = (id, orderItemBody) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.orderItem.update({ where: { id }, data: orderItemBody });
});
exports.updateOrderItem = updateOrderItem;
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
const updateOrder = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.order.update({ where: { id }, data });
});
exports.updateOrder = updateOrder;
