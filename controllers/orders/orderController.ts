import { Request, Response } from "express";
import prisma from "../../config/db";
import { Prisma } from "@prisma/client";
import { ICreateOrderBody } from "../../types/types";
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
  const { employeeId, orderType } = orderBody;

  const { totalAmount, totalTendered, change, paymentMethod } = transactionBody;

  try {
    const newOrder = await prisma.order.create({
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
      const newTransaction = await createTransactionModel({
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
  } catch (err) {
    console.log(err);
    res.json({ error: `Error in creating transaction: ${err}` });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (err) {
    res.json({ error: `Error in getting all orders: ${err}` });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { orderItems, employee, customer } = req.query;

  if (!id) {
    res.json({ error: "Id is not defined" }).status(401);
    return;
  }

  try {
    const order = await prisma.order.findFirst({
      where: { id: id.toString() },
      include: {
        orderItems:
          orderItems === "true"
            ? {
                include: { product: true },
              }
            : false,
        employee: employee === "true",
        customer: customer === "true",
      },
    });

    if (!order?.id) {
      res.json({ message: "Order do not exist." }).status(401);
      return;
    }

    res.json(order);
  } catch (err) {
    res.json({ error: `There was a problem getting order with id of ${id}` });
  }
};
