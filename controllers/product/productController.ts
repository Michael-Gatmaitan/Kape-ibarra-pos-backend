import { Prisma } from "@prisma/client";
// import { createProductWithCategory } from "../../models/productModel";
import { Request, Response } from "express";
import prisma from "../../config/db";
import { ICreateProductBody } from "../../types/types";

/**
 * Req body should
 *    categoryId: number;
 *    price: number;
 *    productName: string;
 */

export const createProduct = async (req: Request, res: Response) => {
  const body: ICreateProductBody = req.body;

  const newProduct = await prisma.product.create({
    data: body,
  });

  if (!newProduct.id) {
    res.json({ error: "Creation of new product failed." });
  }

  res.json(newProduct);
};
