import { Request, Response } from "express";
import prisma from "../../config/db";

export const getAllInventory = async (req: Request, res: Response) => {
  try {
    const inventories = await prisma.inventory.findMany({
      include: {
        rawMaterial: true,
      },
    });

    console.log(inventories);
    res.json(inventories);
  } catch (err) {
    res.json({ message: `There was an error getting all inventories: ${err}` });
  }
};
