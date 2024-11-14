// import { Request, Response } from "express";
// import prisma from "../../config/db";
// import { ICreateBranchBody } from "../../types/types";

// export const getBranches = async (req: Request, res: Response) => {
//   const branches = await prisma.branch.findMany();
//   console.log(branches);
//   res.json(branches);
// };

// export const getBranchById = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   const branch = await prisma.branch.findFirst({ where: { id } });
//   console.log(branch);
//   if (!branch?.id) {
//     res.json({ error: `Cannot find branch with id of ${id}` });
//     return;
//   }
//   res.json(branch);
// };

// export const deleteBranchById = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   const deletedBranch = await prisma.branch.delete({ where: { id } });

//   console.log("branch deleted successfully");

//   res.json(deletedBranch);
// };

// export const updateBranchById = async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const data = req.body;

//   data.zipCode = parseInt(data.zipCode.toString());

//   const updatedBranch = await prisma.branch.update({ where: { id }, data });

//   console.log("Updated branch: ", updatedBranch);
//   res.json(updatedBranch);
// };

// export const createBranch = async (req: Request, res: Response) => {
//   const body: ICreateBranchBody = req.body;
//   // const { region, province, contactNumber, baranggay, city, streetAddress, zipCode } = body;

//   console.log("New branch created");

//   const newBranch = await prisma.branch.create({
//     data: body,
//   });

//   if (!newBranch.id) {
//     res.json({ error: "Creation of branch failed" });
//   }

//   res.json(newBranch);
// };
