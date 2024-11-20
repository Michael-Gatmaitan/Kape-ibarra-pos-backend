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
exports.createOrder = void 0;
const db_1 = __importDefault(require("../../config/db"));
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
 *          amountPaid
 *          paymentMethod
 *        }
 *
 */
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // transactionBody destructured
    const { orderBody, orderItemsBody } = req.body;
    const { userId } = orderBody;
    const result = yield db_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const productIds = orderItemsBody.map((item) => item.productId);
        const products = yield prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, price: true },
        });
        const productPriceMap = products.reduce((acc, product) => {
            acc[product.id] = product.price;
            return acc;
        }, {});
        console.log(productPriceMap);
        const updatedOrderItemsBody = orderItemsBody.map((item) => (Object.assign(Object.assign({}, item), { quantityAmount: item.quantity * (productPriceMap[item.productId] || 0) })));
        let orderTotalPrice = 0;
        updatedOrderItemsBody.map((orderItem) => {
            orderTotalPrice += orderItem.quantityAmount;
        });
        console.log(updatedOrderItemsBody, orderTotalPrice);
        const newOrder = yield prisma.order.create({
            data: {
                userId,
                totalPrice: orderTotalPrice,
                orderItems: {
                    createMany: {
                        data: updatedOrderItemsBody,
                    },
                },
                // transactions: {
                //   create: transactionBody,
                // },
            },
        });
        // get the order base on order Id OR get order base on orderBodyItems
        return newOrder;
    }));
    res.json(result);
});
exports.createOrder = createOrder;
