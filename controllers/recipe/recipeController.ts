import { Request, Response } from "express";
import prisma from "../../config/db";

export const getRecipeByProductId = async (req: Request, res: Response) => {
  console.log(req.body);
  // const { id } = req.params;
  //
  const productId = req.query.productId as string;

  if (productId) {
    try {
      const recipe = await prisma.recipe.findMany({
        where: {
          productId,
        },

        select: {
          rawMaterialId: true,
          quantityInUnitPcsNeeded: true,
        },
      });
      res.json(recipe);
    } catch (err) {
      console.log(err);
      res.json({ error: err });
    }
  }
};
