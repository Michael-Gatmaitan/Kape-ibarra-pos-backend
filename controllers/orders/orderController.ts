import { Request, Response } from "express";
import prisma from "../../config/db";

export const createOrder = async (req: Request, res: Response) => {
  console.log("create order");
  // res.json({ here: "ASDASD" });
  res.json({ asdas: "ASDASDssss" });
  // res.status(20).json("create order");

  // create order first before referencing orderitems to it
};

export const readOrder = async (req: Request, res: Response) => {
  console.log("read order");
  res.json({ ASD: "ASDASD" });
};

export const updateOrder = async (req: Request, res: Response) => {
  console.log("update order");
  // res.status(20).json("update order");
};

export const deleteOrder = async (req: Request, res: Response) => {
  console.log("delete order");
  // res.status(20).json("delete order");
};
