import { Request, Response } from "express";
import prisma from "../../config/db";

export const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await prisma.sales.findMany();

    res.json(sales);
  } catch (err) {
    const message = `There was an error getting sales ${err}`;
    console.log(message);
    res.json({ message }).status(401);
  }
};
