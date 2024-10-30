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
 *        { branchId, userId }
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
 *          branchId
 *        }
 *
 */

export const createOrder = async (req: Request, res: Response) => {
  const { orderBody, orderItemsBody, transactionBody }: ICreateOrderSelf =
    req.body;
  const { branchId, userId } = orderBody;

  const result = await prisma.$transaction(async (prisma) => {
    orderItemsBody.map(async (item) => {
      const product = await prisma.product.findFirst({
        where: { id: item.productId },
      });

      console.log(product);

      return (item.quantityAmount = product!.price * item.quantity);
    });

    console.log(orderItemsBody);

    const newOrder = await prisma.order.create({
      data: {
        branchId,
        userId,

        orderItems: {
          createMany: {
            data: orderItemsBody,
          },
        },

        transactions: {
          create: transactionBody,
        },
      },
    });

    return newOrder;
  });

  // const newOrder =

  res.json(result);
};
