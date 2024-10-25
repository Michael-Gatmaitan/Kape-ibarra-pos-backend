import express, { Express, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";

import {
  createOrder,
  readOrder,
  updateOrder,
  deleteOrder,
} from "./controllers/orders/orderController";

const app = express();
const prisma = new PrismaClient();

const router = Router();

app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 9999;

router
  .route("/order")
  .get(readOrder)
  .post(createOrder)
  .patch(updateOrder)
  .delete(deleteOrder);

app.use(router);

// send get req in home
app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
});

app.post("/create-user", async () => {
  const newBranch = await prisma.branch.create({
    data: {
      streetAddress: "8 JC st.",
      baranggay: "pob 2",
      city: "marilao",
      zipCode: 3019,

      // user: {
      //   create: {
      //     firstname: "Michael Gatmaitan"
      //   }
      // }
    },
  });

  // return res.send({ message: "User created successfully", status: 200 });
});

// Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
  next(err);
});

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
