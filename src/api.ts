import express, { Application, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Routes
import orderRoute from "../routes/orderRoutes";
import productRoute from "../routes/productRoutes";
import categoryRoute from "../routes/categoryRoutes";
import roleRoute from "../routes/roleRoutes";
import rawMaterialRoute from "../routes/rawMaterialRoutes";
import recipeRoute from "../routes/recipeRoutes";
import employeeRoute from "../routes/employeeRoutes";
import transactionRoute from "../routes/transactionRoutes";
import customerRoute from "../routes/customerRoutes";
import batchRoute from "../routes/batchRoutes";
import inventoryRoute from "../routes/inventoryRoutes";
import auditLogRoute from "../routes/auditLogRoutes";
import eWalletRoute from "../routes/eWalletRoutes";
import viewRoute from "../routes/viewRoutes";
import functionRoute from "../routes/functionRoutes";
import saleRoute from "../routes/saleRoutes";

import prisma from "../config/db";
import { generateToken } from "../auth/jwt";
import { ICreateEmployeeBody } from "../types/types";
import { auth } from "../middlewares/authMiddleware";

import { setupTrigger } from "../prisma/triggers";
import { setupFunctions } from "../prisma/functions";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

dotenv.config();

const PORT = process.env.PORT;
console.log("POERT: ", PORT);

app.get("/", async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

setupTrigger();
setupFunctions();

// authMiddleware(["admin", "customer"])
app.use("/product", auth, productRoute);
app.use("/category", auth, categoryRoute);
app.use("/order", auth, orderRoute);
app.use("/role", auth, roleRoute);
app.use("/raw-material", auth, rawMaterialRoute);
app.use("/recipe", auth, recipeRoute);
app.use("/employee", auth, employeeRoute);
app.use("/transaction", auth, transactionRoute);
app.use("/customer", auth, customerRoute);
app.use("/batch", auth, batchRoute);
app.use("/inventory", auth, inventoryRoute);
app.use("/audit-log", auth, auditLogRoute);
app.use("/e-wallet", auth, eWalletRoute);
app.use("/view", auth, viewRoute);
app.use("/function", functionRoute);
app.use("/sale", auth, saleRoute);

// (async function () {
// seed
// })();

app.post("/login", async (req: Request, res: Response) => {
  const body: { username: string; password: string } = req.body;
  const loginType = req.query.loginType;

  if (!loginType) {
    res.json({ error: "Login type indvalid" });
    return;
  }

  try {
    if (loginType === "employee") {
      const employee = await prisma.employee.findFirst({
        where: {
          username: body.username,
          password: body.password,
        },
      });

      if (employee === null) {
        res.json({ error: "User could not find: employee" }).status(401);
        return;
      }

      const token = await generateToken(employee);
      res.json({ token });
    } else if (loginType === "customer") {
      const customer = await prisma.customer.findFirst({
        where: {
          username: body.username,
          password: body.password,
        },
      });

      if (customer === null) {
        res.json({ error: "User could not find: customer" }).status(401);
        return;
      }

      const token = await generateToken(customer);
      console.log("Token for customer", token);
      res.json({ token });
    }
  } catch (err) {
    res.json({ message: `There was an error logging in: ${err}` });
  }
});

app.post("/create-customer", async (req: Request, res: Response) => {
  const body = req.body;
  const { username } = req.body;

  try {
    const customerExisted = await prisma.customer.findFirst({
      where: { username },
    });

    if (customerExisted?.id) {
      res.json({ message: `Username already exists` }).status(401);
    }

    const newCustomer = await prisma.customer.create({
      data: body,
    });

    console.log("New customer created: ", newCustomer);
    res.json(newCustomer);
  } catch (err) {
    const message = `There was an error creating new customer: ${err}`;
    console.log(message);
    res.json({ message }).status(401);
  }
});

app.post("/signup", async (req: Request, res: Response) => {
  const body: ICreateEmployeeBody = req.body;

  const newEmployee = await prisma.employee.create({
    data: body,
  });

  console.log(newEmployee);

  res.json(newEmployee);
});

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});

export default app;
