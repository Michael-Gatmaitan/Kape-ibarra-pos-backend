import express, { Router, Request, Response } from "express";
import { ICreateEmployeeBody } from "../../types/types";
import prisma from "../../config/db";

const router: Router = express.Router();
/**
 * firstname, lastname, username, password, cpNum, roleId
 */

export const getAllEmployee = async (req: Request, res: Response) => {
  const fullInfo = req.query.fullInfo;

  try {
    const employees = await prisma.employee.findMany({
      include: {
        role: fullInfo === "true",
      },
    });

    res.json(employees);
  } catch (err) {
    res.json({ error: `There was an error getting all employee: ${err}` });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const order = req.query.order;
  const role = req.query.role;

  if (!id) {
    res.json({ message: "ID parameter is missing in url" });
    return;
  }

  try {
    const result = await prisma.employee.findFirst({
      where: { id },
      include: {
        orders: order === "true",
        role: role === "true",
      },
    });
    res.json(result);
  } catch (err) {
    res.json({
      message: `There was an error getting employee by id of: ${id}, err: ${err}`,
    });
  }
};

// Create new employee using { req.body } if validated on frontend
export const createEmployee = async (req: Request, res: Response) => {
  const body: ICreateEmployeeBody = req.body;
  // const body: { username: string; password: string } = req.body;

  const newEmployee = await prisma.employee.create({
    data: body,
  });

  if (!newEmployee.id) {
    res.json({ error: "Creation of new employee failed." });
  }

  res.json({ newEmployee });
};

// Get specific employee
// router.get(
//   "/:name",
//   (req: Request & { params: { name: string } }, res: Response) => {
//     res.json({ res: `employee's name is ${req.params.name}` });
//   }
// );

// export default router;
