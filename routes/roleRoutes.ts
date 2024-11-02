import express, { Router, Request, Response } from "express";
import prisma from "../config/db";

const route: Router = express.Router();

route.get("/", async (req: Request, res: Response) => {
  const roles = await prisma.role.findMany();

  res.json(roles);
});

export default route;
