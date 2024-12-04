import { Request, Response } from "express";
import prisma from "../../config/db";

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany();

    res.json(customers);
  } catch (err) {
    res
      .json({ message: `There was an error getting all customers: ${err}` })
      .status(401);
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const customer = await prisma.customer.findFirst({ where: { id } });

    if (!customer) {
      res.json({ message: `No customer with ${id} was found` }).status(401);
      return;
    }

    res.json(customer);
  } catch (err) {
    res
      .json({ message: `There was an error getting customer by id: ${err}` })
      .status(401);
  }
};
