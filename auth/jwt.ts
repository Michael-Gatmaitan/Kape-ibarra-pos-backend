import prisma from "../config/db";
import { Request, Response, NextFunction } from "express";
import { ICustomer, IEmployee } from "../types/types";
import jwt, { Secret } from "jsonwebtoken";

export const generateToken = async (person: ICustomer | IEmployee) => {
  const SECRET_KEY: Secret = process.env.SECRET_KEY as string;
  console.log(SECRET_KEY);

  if ("roleId" in person) {
    const roleName = (
      await prisma.role.findFirstOrThrow({ where: { id: person.roleId } })
    ).roleName;

    return jwt.sign({ person, roleName }, SECRET_KEY);
  } else {
    return jwt.sign({ person, roleName: "customer" }, SECRET_KEY);
  }
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  const SECRET_KEY: Secret = process.env.SECRET_KEY as string;

  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) res.status(403).json({ error: "Invalid  token" });

    console.log("Validated");
    res.json({});
    next();
  });
};

export const decrpytToken = async (token: string) => {
  const SECRET_KEY: Secret = process.env.SECRET_KEY as string;
  let payload = jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return "Invalid token";
    }

    return decoded;
  });

  return payload;
};
