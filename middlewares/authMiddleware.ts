import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { ICustomer, IEmployee } from "../types/types";

const SECRET_KEY: Secret = process.env.SECRET_KEY as string;

type Role = "Admin" | "Barista" | "Cashier" | "Customer";

export function authMiddleware(requiredRole: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).send("Unauthorized");
      return;
    }

    jwt.verify(token, `${SECRET_KEY}`, (err, decoded) => {
      if (err) {
        res.status(401).send("Invalid token");
        return;
      }

      const payload = decoded as JwtPayload & {
        person: IEmployee | ICustomer;
        roleName: Role;
      };

      if (!requiredRole.includes(payload?.roleName)) {
        res.status(403).send("Forbidden");
        return;
      }

      // req["user"] = payload;
      next();
    });
  };
}

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  jwt.verify(token, `${SECRET_KEY}`, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const payload = decoded as JwtPayload & {
      person: IEmployee | ICustomer;
      roleName: string;
    };

    if (!payload?.person?.id) {
      res.status(403).json({ message: "Forbidden" });
    }

    // console.log("User valid: ", payload);

    next();
  });
}
