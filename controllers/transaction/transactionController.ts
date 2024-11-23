import { Request, Response } from "express";
import prisma from "../../config/db";

export const getAllTransaction = async (req: Request, res: Response) => {
  console.log("getting transactions");
  try {
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
