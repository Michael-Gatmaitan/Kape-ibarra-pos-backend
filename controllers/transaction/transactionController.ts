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
    res.json({ error: `Error getting all transactions: ${err}` });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  console.log(req);

  res.json({ message: "Transaction complete created" });
};
