import express, { Router, Request, Response } from "express";
import { ICreateUserBody } from "../../types/types";
import prisma from "../../config/db";

const router: Router = express.Router();

// Get all user
router.get("/", (req: Request, res: Response) => {
  res.json({ res: req.params.name });
});

/**
 * firstname, lastname, username, password, cpNum, branchId, roleId
 */

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
