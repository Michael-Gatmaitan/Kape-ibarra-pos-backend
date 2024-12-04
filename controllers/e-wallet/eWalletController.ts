import prisma from "../../config/db";

import { Response, Request } from "express";

export const getEWallet = async (req: Request, res: Response) => {
  try {
    const ewallet = await prisma.eWallet.findFirst();

    res.json(ewallet);
  } catch (err) {
    console.log(`There was an error getting e-wallet: ${err}`);
    res
      .json({ message: `There was an error getting e-wallet: ${err}` })
      .status(401);
  }
};

export const updateEWallet = async (req: Request, res: Response) => {
  const body: { name: string; phoneNumber: string } = req.body;
  const { name, phoneNumber } = body;
  try {
    console.log(body);
    const ewallet = await prisma.eWallet.findFirst();

    if (!ewallet) {
      const newEwallet = await prisma.eWallet.create({
        data: { name, phoneNumber },
      });

      res.json(newEwallet);
      return;
    }

    const updatedEWallet = await prisma.eWallet.update({
      where: { id: ewallet.id },
      data: { name, phoneNumber },
    });

    res.json(updatedEWallet);
  } catch (err) {
    console.log(`There was an error updating e-wallet: ${err}`);
    res.json(`There was an error updating e-wallet: ${err}`).status(401);
  }
};
