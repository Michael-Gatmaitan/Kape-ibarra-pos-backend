import { Request, Response } from "express";
import prisma from "../../config/db";

export const getRawMaterials = async (req: Request, res: Response) => {
  const result = await prisma.rawMaterial.findMany();
  res.json(result);
};
