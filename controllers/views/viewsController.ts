import { Request, Response } from "express";
import prisma from "../../config/db";
export const getTotalOrders = async (req: Request, res: Response) => {
  const customView = await prisma.$queryRaw`
    CREATE OR REPLACE VIEW raw_material_usage AS
    SELECT r."materialName", pr."productName", sum(rec."quantityInUnitPcsNeeded") AS total_quantity_needed
    FROM
        "Recipe" rec
        JOIN "RawMaterial" r ON rec."rawMaterialId" = r."id"
        JOIN "Product" pr ON rec."productId" = pr."id"
    GROUP BY
        r."materialName",
        pr."productName";
  `;

  console.log(customView);

  res.json(customView);
};

export const getOrderByCustomerId = async (req: Request, res: Response) => {};
