import { Request, Response } from "express";
import prisma from "../../config/db";
import { toZonedTime } from "date-fns-tz";

export const getDailySales = async (req: Request, res: Response) => {
  const range = req.query.range as string;

  try {
    if (range) {
      // range
      const start = req.query.start as string;
      const end = req.query.end as string;

      const startDate = toZonedTime(start, "Hongkong");
      const endDate = toZonedTime(end, "Hongkong");

      const result = await prisma.sales.findMany({
        where: {
          date: {
            gt: startDate,
            lt: endDate,
          },
        },
      });

      res.json(result);
      return;
    }

    // whole daily sales
    res.json();
  } catch (err) {
    const message = `Error while getting daily sales: ${err}`;
    console.log(err);
    res.json({ message }).status(404);
  }
};

export const getOrderSales = async (req: Request, res: Response) => {
  const orderType = req.query.orderType as string;

  try {
    if (orderType === "online") {
      const result = await prisma.order.findMany({
        where: {
          orderType: "online",
        },
      });
      res.json(result);
      return;
    } else if (orderType === "walk-in") {
      const result = await prisma.order.findMany({
        where: {
          orderType: "walk-in",
        },
      });
      res.json(result);
      return;
    }

    const allOrders = await prisma.order.findMany();
    res.json(allOrders);
  } catch (err) {
    const message = `Error while getting order sales: ${err}`;
    console.log(err);
    res.json({ message }).status(404);
  }
};
