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
exports.getOrderById = exports.getAllOrders = exports.updateOrderById = exports.createOrder = void 0;
const db_1 = __importDefault(require("../../config/db"));
const transactionModel_1 = require("../../models/transactionModel");
const orderModel_1 = require("../../models/orderModel");
const depletionModel_1 = require("../../models/depletionModel");
const systemEmpId = process.env.SYSTEM_EMPLOYEE_ID;
/**
 *
 * @param orderBody
 *        {
 *          userId
 *          status
 *          orderType
 *        }
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
    try {
        const { orderBody, orderItemsBody } = req.body;
        const { employeeId, orderStatus, orderType, diningOption } = orderBody;
        const { customerId } = orderBody;
        console.log(req.body);
        // Only walk-ins have a transaction body since they are
        // paid
        if (orderType === "walk-in") {
            const { totalAmount, totalTendered, change, paymentMethod } = req.body.transactionBody;
            const newOrder = yield db_1.default.order.create({
                data: {
                    employeeId,
                    totalPrice: totalAmount,
                    orderStatus,
                    orderType,
                    diningOption,
                    orderItems: {
                        createMany: {
                            data: orderItemsBody,
                        },
                    },
                },
            });
            const newTransaction = yield (0, transactionModel_1.createTransactionModel)({
                orderId: newOrder.id,
                change,
                totalAmount,
                totalTendered,
                paymentMethod,
            });
            console.log("New transaction created: ", newTransaction);
            console.log("YOu just made order!!!", newOrder);
            //
            (0, depletionModel_1.deductInventory)(orderItemsBody);
            res.json(newOrder);
        }
        else if (orderType === "online") {
            const system = yield db_1.default.employee.findFirst({
                where: {
                    id: "c65b9c9c-c016-4ef7-bfc6-c631cb7eaa9e",
                },
            });
            if (!system) {
                res.json({ message: "System id not found" }).status(401);
                return;
            }
            const newOrder = yield db_1.default.order.create({
                data: {
                    employeeId: system.id,
                    customerId, // We have a customer id in online !!!
                    orderStatus,
                    orderType,
                    diningOption,
                    orderItems: {
                        createMany: {
                            data: orderItemsBody,
                        },
                    },
                },
            });
            res.json(newOrder);
        }
    }
    catch (err) {
        console.log(err);
        res.json({ error: `Error in creating transaction: ${err}` });
    }
});
exports.createOrder = createOrder;
// * /order/[id]?updateType=confirmation
const updateOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateType = req.query.updateType;
    try {
        const orderToUpdate = yield db_1.default.order.findFirst({ where: { id } });
        if (!orderToUpdate) {
            res
                .json({ message: `Order to update with id of ${id} not found` })
                .status(401);
            return;
        }
        // This ensure that the order to update is from
        // customer that ordered ONLINE
        if (updateType &&
            updateType === "payment_confirmation" &&
            orderToUpdate.orderType === "online" &&
            orderToUpdate.employeeId === systemEmpId &&
            orderToUpdate.orderStatus === "payment pending") {
            const body = req.body;
            const updatedOrder = yield db_1.default.order.update({
                where: { id },
                data: {
                    employeeId: body.employeeId,
                    orderStatus: "preparing",
                },
            });
            res.json(updatedOrder);
            return;
        }
        else if (updateType &&
            updateType === "mark_as_done" &&
            orderToUpdate.orderStatus === "preparing") {
            const { baristaId } = req.body;
            const updatedOrder = yield db_1.default.order.update({
                where: { id },
                data: {
                    orderStatus: "ready",
                    baristaId,
                },
            });
            console.log(`Order of ${updatedOrder.id} marked as done`);
            res.json(updatedOrder);
            return;
        }
        // ... for now, the only way to update the order is
        // by confirming it by [cashier] after seeing POP
    }
    catch (err) {
        res
            .json({ message: `There was an error in updating order: ${err}` })
            .status(401);
    }
});
exports.updateOrderById = updateOrderById;
// * /order?lastOrder=true
// * /order?employeeId=[id]
// * /order?orderStatus=[preparing | payment pending | ready]
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeId = req.query.employeeId;
    const orderStatus = req.query.orderStatus;
    const lastOrder = req.query.lastOrder;
    try {
        if (employeeId) {
            const orders = yield (0, orderModel_1.getOrderByEmployeeId)(employeeId);
            res.json(orders);
            return;
        }
        // for returning last order
        if (lastOrder === "true") {
            const order = yield (0, orderModel_1.getLastOrder)();
            res.json(order);
            return;
        }
        if (["preparing", "payment pending", "ready"].includes(orderStatus)) {
            const orders = yield (0, orderModel_1.getOrderByOrderStatus)(orderStatus);
            res.json(orders);
            return;
        }
        const orders = yield db_1.default.order.findMany();
        res.json(orders);
    }
    catch (err) {
        res.json({ error: `Error in getting all orders: ${err}` });
    }
});
exports.getAllOrders = getAllOrders;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { orderItems, employee, customer, employeeId } = req.query;
    // if (!id) {
    //   res.json({ error: "Id is not defined" }).status(401);
    //   return;
    // }
    try {
        const order = yield db_1.default.order.findFirst({
            where: { id },
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
