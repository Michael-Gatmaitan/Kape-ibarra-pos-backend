import prisma from "../config/db";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../types/types";
import jwt, { Secret } from "jsonwebtoken";

const SECRET_KEY: Secret = process.env.SECRET_KEY as string;

export const generateToken = async (user: IUser) => {
  const roleName = (
    await prisma.role.findFirstOrThrow({ where: { id: user.roleId } })
  ).roleName;

  return jwt.sign({ id: user.id, roleName }, SECRET_KEY);
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) res.status(403).json({ error: "Invalid  token" });
    next();
  });
};
