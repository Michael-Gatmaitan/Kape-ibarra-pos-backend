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
exports.updateTransactionById = exports.getTransactionById = exports.createTransaction = exports.getAllTransaction = void 0;
const db_1 = __importDefault(require("../../config/db"));
const transactionModel_1 = require("../../models/transactionModel");
// For barista, get the order and all of the order items in order
const getAllTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // barista=true
    const order = req.query.order;
    const orderStatus = req.query.orderStatus;
    const orderBy = req.query.orderBy;
    try {
        if (order === "true") {
            const transactions = yield db_1.default.transaction.findMany({
                where: {
                    order: orderStatus
                        ? {
                            orderStatus,
                        }
                        : undefined,
                },
                include: {
                    order: {
                        include: {
                            orderItems: {
                                include: {
                                    product: {
                                        include: {
                                            category: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                orderBy: orderBy === "time"
                    ? {
                        // order: {
                        //   orderedAt: orderBy === "time" ? true : false,
                        // }
                        order: {
                            orderedAt: "desc",
                        },
                    }
                    : undefined,
            });
            res.json(transactions);
            return;
        }
        const transactions = yield db_1.default.transaction.findMany();
        res.json(transactions);
    }
    catch (err) {
        console.log(err);
        res.json({ error: `Error getting all transactions: ${err}` }).status(401);
    }
});
exports.getAllTransaction = getAllTransaction;
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    const transactionType = req.query.transactionType;
    try {
        if (transactionType === "customer") {
            console.log("Transaction type: ", transactionType);
            const { orderId, change = 0,
            // totalAmount, // ?? walang transaction body sa accepting
            // totalTendered,
            // paymentMethod = "gcash",
             } = req.body;
            const order = yield db_1.default.order.findFirst({
                where: { id: orderId },
                include: { orderItems: true },
            });
            if (!(order === null || order === void 0 ? void 0 : order.id)) {
                res.json({ message: `Online Order not found` });
                return;
            }
            let totalAmountAndTotalTendered = 0;
            order === null || order === void 0 ? void 0 : order.orderItems.map((orderItem) => {
                totalAmountAndTotalTendered += orderItem.quantityAmount;
            });
            console.log("Total order price: ", totalAmountAndTotalTendered);
            // update order total amount
            yield db_1.default.order.update({
                where: { id: orderId },
                data: {
                    totalPrice: totalAmountAndTotalTendered,
                },
            });
            const newTransaction = yield (0, transactionModel_1.createTransactionModel)({
                orderId,
                change,
                totalAmount: totalAmountAndTotalTendered,
                totalTendered: totalAmountAndTotalTendered,
                paymentMethod: "gcash",
            });
            console.log(newTransaction);
            res.json(newTransaction);
            return;
        }
    }
    catch (err) {
        res
            .json({
            message: `There was an error creating transaction for customer: ${err}`,
        })
            .status(401);
    }
    res.json({ message: "Transaction complete created" });
});
exports.createTransaction = createTransaction;
const getTransactionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const transaction = yield db_1.default.transaction.findFirst({
            where: { id },
        });
        if (!transaction) {
            res.json({ message: `Cannot find transaction of id: ${id}` }).status(401);
            return;
        }
        res.json(transaction);
    }
    catch (err) {
        res
            .json({
            message: `There was an error finding transaction by id: ${err}`,
        })
            .status(401);
    }
});
exports.getTransactionById = getTransactionById;
const updateTransactionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedTransactionBody = req.body;
    try {
        const transaction = yield db_1.default.transaction.findFirst({ where: { id } });
        if (!transaction) {
            res.json({ message: `Cannot find transaction of id: ${id}` }).status(401);
            return;
        }
        const updatedTransaction = yield db_1.default.transaction.update({
            where: { id },
            data: updatedTransactionBody,
        });
        res.json(updatedTransaction);
    }
    catch (err) {
        res
            .json({
            message: `There was an error updating transaction by id: ${err}`,
        })
            .status(401);
    }
});
exports.updateTransactionById = updateTransactionById;
