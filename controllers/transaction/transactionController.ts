import { Request, Response } from "express";
import prisma from "../../config/db";
import { createTransactionModel } from "../../models/transactionModel";

// For barista, get the order and all of the order items in order
export const getAllTransaction = async (req: Request, res: Response) => {
  // barista=true
  const order = req.query.order as string;
  const orderStatus = req.query.orderStatus as string;
  const orderBy = req.query.orderBy as string;

  try {
    if (order === "true") {
      const transactions = await prisma.transaction.findMany({
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
        orderBy:
          orderBy === "time"
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
    const transactions = await prisma.transaction.findMany();
    res.json(transactions);
  } catch (err) {
    console.log(err);
    res.json({ error: `Error getting all transactions: ${err}` }).status(401);
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  console.log(req);
  const transactionType = req.query.transactionType as string;

  try {
    if (transactionType === "customer") {
      console.log("Transaction type: ", transactionType);
      const {
        orderId,
        change = 0,
        // totalAmount, // ?? walang transaction body sa accepting
        // totalTendered,
        // paymentMethod = "gcash",
      } = req.body;

      const order = await prisma.order.findFirst({
        where: { id: orderId },
        include: { orderItems: true },
      });

      if (!order?.id) {
        res.json({ message: `Online Order not found` });
        return;
      }

      let totalAmountAndTotalTendered = 0;
      order?.orderItems.map((orderItem) => {
        totalAmountAndTotalTendered += orderItem.quantityAmount;
      });

      console.log("Total order price: ", totalAmountAndTotalTendered);

      // update order total amount
      await prisma.order.update({
        where: { id: orderId },
        data: {
          totalPrice: totalAmountAndTotalTendered,
        },
      });

      const newTransaction = await createTransactionModel({
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
  } catch (err) {
    res
      .json({
        message: `There was an error creating transaction for customer: ${err}`,
      })
      .status(401);
  }

  res.json({ message: "Transaction complete created" });
};

export const getTransactionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const transaction = await prisma.transaction.findFirst({
      where: { id },
    });

    if (!transaction) {
      res.json({ message: `Cannot find transaction of id: ${id}` }).status(401);
      return;
    }

    res.json(transaction);
  } catch (err) {
    res
      .json({
        message: `There was an error finding transaction by id: ${err}`,
      })
      .status(401);
  }
};

export const updateTransactionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedTransactionBody = req.body;

  try {
    const transaction = await prisma.transaction.findFirst({ where: { id } });
    if (!transaction) {
      res.json({ message: `Cannot find transaction of id: ${id}` }).status(401);
      return;
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: updatedTransactionBody,
    });

    res.json(updatedTransaction);
  } catch (err) {
    res
      .json({
        message: `There was an error updating transaction by id: ${err}`,
      })
      .status(401);
  }
};
