import { Request, Response } from "express";
import prisma from "../../config/db";

// For barista, get the order and all of the order items in order
export const getAllTransaction = async (req: Request, res: Response) => {
  // barista=true
  const order = req.query.order as string;
  const orderStatus = req.query.orderStatus as string;
  const orderBy = req.query.orderBy as string;

  console.log("getting transactions");
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
    console.log(transactions);
    res.json(transactions);
  } catch (err) {
    console.log(err);
    res.json({ error: `Error getting all transactions: ${err}` }).status(401);
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  console.log(req);

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
