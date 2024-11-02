import { Request, Response } from "express";
import prisma from "../../config/db";
import { ICreateBranchBody } from "../../types/types";

export const getBranches = async (req: Request, res: Response) => {
  const branches = await prisma.branch.findMany();
  console.log(branches);
  res.json(branches);
};

export const createBranch = async (req: Request, res: Response) => {
  const body: ICreateBranchBody = req.body;
  // const { region, province, contactNumber, baranggay, city, streetAddress, zipCode } = body;

  console.log("New branch created");

  const newBranch = await prisma.branch.create({
    data: body,
  });

  if (!newBranch.id) {
    res.json({ error: "Creation of branch failed" });
  }

  res.json(newBranch);
};
