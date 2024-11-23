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
exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const db_1 = __importDefault(require("../../config/db"));
const transactionModel_1 = require("../../models/transactionModel");
/**
 *
 * @param orderBody
 *        { userId }
 * @param orderItemsBody
 *        [{
 *          productId
 *          quantity
 *          quantityAmount
 *        }]
 *
 * @param transactionBody
 *        {
 *          orderId
 *          totalAmount
 *          totalTendered,
 *          change
 *          paymentMethod
 *        }
 *
 */
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // transactionBody destructured
    const { orderBody, orderItemsBody, transactionBody } = req.body;
    const { employeeId, orderType } = orderBody;
    const { totalAmount, totalTendered, change, paymentMethod } = transactionBody;
    try {
        const newOrder = yield db_1.default.order.create({
            data: {
                employeeId,
                totalPrice: totalAmount,
                orderType,
                orderItems: {
                    createMany: {
                        data: orderItemsBody,
                    },
                },
            },
        });
        if (orderType === "walk-in") {
            const newTransaction = yield (0, transactionModel_1.createTransactionModel)({
                orderId: newOrder.id,
                change,
                totalAmount,
                totalTendered,
                paymentMethod,
            });
            console.log("New transaction created: ", newTransaction);
            console.log("YOu just made order!!!", newOrder);
        }
        res.json(newOrder);
    }
    catch (err) {
        console.log(err);
        res.json({ error: `Error in creating transaction: ${err}` });
    }
});
exports.createOrder = createOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield db_1.default.order.findMany();
        res.json(orders);
    }
    catch (err) {
        res.json({ error: `Error in getting all orders: ${err}` });
    }
});
exports.getAllOrders = getAllOrders;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { orderItems, employee, customer } = req.query;
    if (!id) {
        res.json({ error: "Id is not defined" }).status(401);
        return;
    }
    try {
        const order = yield db_1.default.order.findFirst({
            where: { id: id.toString() },
            include: {
                orderItems: orderItems === "true"
                    ? {
                        include: { product: true },
                    }
                    : false,
                employee: employee === "true",
                customer: customer === "true",
            },
        });
        if (!(order === null || order === void 0 ? void 0 : order.id)) {
            res.json({ message: "Order do not exist." }).status(401);
            return;
        }
        res.json(order);
    }
    catch (err) {
        res.json({ error: `There was a problem getting order with id of ${id}` });
    }
});
exports.getOrderById = getOrderById;
