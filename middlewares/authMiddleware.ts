import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

const SECRET_KEY: Secret = process.env.SECRET_KEY as string;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).send("Invalid token");
      return;
    }

    console.log("middleware");

    // if ('roleName' in decoded) {

    // }

    // Store the role in res.locals
    // res.locals.role = decoded!.roleName;w
    next();
  });
};
