import express, { Router, Request, Response } from "express";
import { ICreateUserBody } from "../../types/types";
import prisma from "../../config/db";

const router: Router = express.Router();
/**
 * firstname, lastname, username, password, cpNum, roleId
 */

export const getAllUsers = async (req: Request, res: Response) => {
  const fullInfo = req.query.fullInfo;

  try {
    const users = await prisma.user.findMany({
      include: {
        role: fullInfo === "true",
      },
    });

    res.json(users);
  } catch (err) {
    res.json({ error: `There was an error getting all user: ${err}` });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const order = req.query.order;
  const role = req.query.role;

  if (!id) {
    res.json({ message: "ID parameter is missing in url" });
    return;
  }

  try {
    const result = await prisma.user.findFirst({
      where: { id },
      include: {
        orders: order === "true",
        role: role === "true",
      },
    });
    res.json(result);
  } catch (err) {
    res.json({
      message: `There was an error getting user by id of: ${id}, err: ${err}`,
    });
  }
};

// Create new user using { req.body } if validated on frontend
export const createUser = async (req: Request, res: Response) => {
  const body: ICreateUserBody = req.body;
  // const body: { username: string; password: string } = req.body;

  const newUser = await prisma.user.create({
    data: body,
  });

  if (!newUser.id) {
    res.json({ error: "Creation of new user failed." });
  }

  res.json({ newUser });
};

// Get specific user
router.get(
  "/:name",
  (req: Request & { params: { name: string } }, res: Response) => {
    res.json({ res: `user's name is ${req.params.name}` });
  }
);

export default router;
