import { Request, Response } from "express";
import prisma from "../../config/db";

export const calculateOrderAmount = async (req: Request, res: Response) => {
  const request =
    await prisma.$queryRaw`CREATE OR REPLACE FUNCTION calculate_order_amount("order_id" UUID) 
    RETURNS FLOAT AS $$
    DECLARE
      total_amount FLOAT := 0;
    BEGIN
      SELECT SUM(oi."quantityAmount")
      INTO total_amount
      FROM "OrderItem" oi
      WHERE oi."orderId" = order_id;
      RETURN total_amount;
    END;
    $$ LANGUAGE plpgsql;
  `;
  console.log(request);

  res.json(request);
};
