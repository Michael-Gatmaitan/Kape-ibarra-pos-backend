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
exports.createOnlineOrder = exports.getOrderByEmployeeId = exports.getOrderByOrderStatus = exports.getLastOrder = void 0;
const db_1 = __importDefault(require("../config/db"));
// OrderItem and Orders will implemented here
// We will base all of the id on USER eg cashier
// ? Multiple orderItems in 1 order
// Get
const getLastOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield db_1.default.order.findMany({
        select: {
            customerNumber: true,
        },
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
        include: {
            customer: true,
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
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
const createOnlineOrder = (_a) => __awaiter(void 0, [_a], void 0, function* ({ customerId, orderStatus, orderType, diningOption, proofOfPaymentImg, orderItemsBody, }) {
    try {
        const system = yield db_1.default.employee.findFirst({
            where: { id: "c65b9c9c-c016-4ef7-bfc6-c631cb7eaa9e" },
        });
        if (!system) {
            return { message: "System id not found" };
        }
        console.log("payment url", proofOfPaymentImg);
        const newOrder = yield db_1.default.order.create({
            data: {
                employeeId: system.id,
                customerId, // We have a customer id in online !!!
                orderStatus,
                orderType,
                diningOption,
                proofOfPaymentImg,
                orderItems: {
                    createMany: {
                        data: orderItemsBody,
                    },
                },
            },
        });
        return newOrder;
    }
    catch (err) {
        const errResult = `There was an error creating online order: ${err}`;
        console.log(errResult);
        return { message: errResult };
    }
});
exports.createOnlineOrder = createOnlineOrder;
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
