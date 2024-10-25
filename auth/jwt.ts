import { Request, Response, NextFunction } from "express";
import { IUser } from "../types/types";
import jwt, { Secret } from "jsonwebtoken";

const SECRET_KEY: Secret = process.env.SECRET_KEY as string;

export const generateToken = (user: IUser) => {
  return jwt.sign(
    { id: user.id.toString(), role: user.roleId.toString() },
    SECRET_KEY
  );
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) return res.status(403).json({ error: "Invalid  token" });
  });
};
