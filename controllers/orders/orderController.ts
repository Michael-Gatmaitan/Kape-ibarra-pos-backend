import { Request, Response } from "express";
import prisma from "../../config/db";
import { Prisma } from "@prisma/client";
import { ICreateOrderBody, ICreateOrderItemBody } from "../../types/types";

interface ICreateOrderSelf {
  orderBody: ICreateOrderBody;
  orderItemsBody: Prisma.OrderItemUncheckedCreateInput[];
  transactionBody: Prisma.TransactionUncheckedCreateInput;
}

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

export const createOrder = async (req: Request, res: Response) => {
  const { orderBody, orderItemsBody, transactionBody }: ICreateOrderSelf =
    req.body;
  const { userId } = orderBody;

  const result = await prisma.$transaction(async (prisma) => {
    const productIds = orderItemsBody.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price: true },
    });

    const productPriceMap = products.reduce(
      (acc, product) => {
        acc[product.id] = product.price;
        return acc;
      },
      {} as Record<string, number>,
    );

    console.log(productPriceMap);

    const updatedOrderItemsBody = orderItemsBody.map((item) => ({
      ...item,
      quantityAmount: item.quantity * (productPriceMap[item.productId] || 0),
    }));

    let orderTotalPrice = 0;
    updatedOrderItemsBody.map((orderItem) => {
      orderTotalPrice += orderItem.quantityAmount;
    });

    console.log(updatedOrderItemsBody, orderTotalPrice);

    const newOrder = await prisma.order.create({
      data: {
        userId,
        totalPrice: orderTotalPrice,

        orderItems: {
          createMany: {
            data: updatedOrderItemsBody,
          },
        },

        transactions: {
          create: transactionBody,
        },
      },
    });

    // get the order base on order Id OR get order base on orderBodyItems

    return newOrder;
  });

  res.json(result);
};
