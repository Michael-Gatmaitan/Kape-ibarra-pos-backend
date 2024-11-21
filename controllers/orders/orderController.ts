import { Request, Response } from "express";
import prisma from "../../config/db";
import { Prisma } from "@prisma/client";
import { ICreateOrderBody, ICreateOrderItemBody } from "../../types/types";
import { createTransactionModel } from "../../models/transactionModel";

interface ICreateOrderSelf {
  orderBody: ICreateOrderBody;
  orderItemsBody: Prisma.OrderItemCreateManyInput;
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
 *          orderId
 *          totalAmount
 *          totalTendered,
 *          change
 *          paymentMethod
 *        }
 *
 */

export const createOrder = async (req: Request, res: Response) => {
  // transactionBody destructured
  const { orderBody, orderItemsBody, transactionBody }: ICreateOrderSelf =
    req.body;
  const { employeeId } = orderBody;

  const { totalAmount, totalTendered, change, paymentMethod } = transactionBody;

  try {
    const newOrder = await prisma.order.create({
      data: {
        employeeId,

        orderItems: {
          createMany: {
            data: orderItemsBody,
          },
        },
      },
    });

    const newTransaction = await createTransactionModel({
      orderId: newOrder.id,
      change,
      totalAmount,
      totalTendered,
      paymentMethod,
    });

    console.log("New transaction created: ", newTransaction);
    console.log("YOu just made order!!!", newOrder);

    res.json(newOrder);
  } catch (err) {
    console.log(err);
    res.json({ error: `Error in creating transaction: ${err}` });
  }

  // const newTransaction = await prisma.transaction.create({
  //   data: {
  //     change:
  //   }
  // })

  // const result = await prisma.$transaction(async (prisma) => {
  //   const productIds = orderItemsBody.map((item) => item.productId);
  //   const products = await prisma.product.findMany({
  //     where: { id: { in: productIds } },
  //     select: { id: true, price: true },
  //   });

  //   const productPriceMap = products.reduce((acc, product) => {
  //     acc[product.id] = product.price;
  //     return acc;
  //   }, {} as Record<string, number>);

  //   console.log(productPriceMap);

  //   const updatedOrderItemsBody = orderItemsBody.map((item) => ({
  //     ...item,
  //     quantityAmount: item.quantity * (productPriceMap[item.productId] || 0),
  //   }));

  //   let orderTotalPrice = 0;
  //   updatedOrderItemsBody.map((orderItem) => {
  //     orderTotalPrice += orderItem.quantityAmount;
  //   });

  //   console.log(updatedOrderItemsBody, orderTotalPrice);

  //   const newOrder = await prisma.order.create({
  //     data: {
  //       employeeId,
  //       totalPrice: orderTotalPrice,

  //       orderItems: {
  //         createMany: {
  //           data: updatedOrderItemsBody,
  //         },
  //       },

  //       // transactions: {
  //       //   create: transactionBody,
  //       // },
  //     },
  //   });

  //   // get the order base on order Id OR get order base on orderBodyItems

  //   return newOrder;
  // });

  // res.json(result);
};
