import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Routes
import userRoute from "./routes/userRoutes";
import orderRoute from "./routes/orderRoutes";
import productRoute from "./routes/productRoutes";
import categoryRoute from "./routes/categoryRoutes";
import branchRoute from "./routes/branchRoutes";
import roleRoute from "./routes/roleRoutes";
import rawMaterialRoute from "./routes/rawMaterialRoutes";
import recipeRoute from "./routes/recipeRoutes";

import prisma from "./config/db";
import { generateToken, verifyToken } from "./auth/jwt";
// import { generateToken } from "./auth/jwt";

import { Server } from "socket.io";
import { createServer } from "http";
import { ICreateUserBody } from "./types/types";

const app: Application = express();

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => console.log("Connected: ", socket.id));

app.use(express.json());
app.use(cors());
app.use(cookieParser());

dotenv.config();

const PORT = process.env.PORT || 9999;

app.use("/user", userRoute);
app.use("/branch", branchRoute);
app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.use("/order", orderRoute);
app.use("/role", roleRoute);
app.use("/rawMaterial", rawMaterialRoute);
app.use("/recipe", recipeRoute);

(async function () {
  const role = await prisma.role.findFirst({
    where: {
      roleName: { in: ["Branch Admin", "Cashier", "Barista"] },
    },
  });

  if (!role?.id) {
    await prisma.role.createMany({
      data: [
        { roleName: "Branch Admin" },
        { roleName: "Cashier" },
        { roleName: "Barista" },
      ],
    });

    console.log("Roles created");
  }

  const branch = await prisma.branch.findFirst();

  if (!branch?.id) {
    await prisma.branch.create({
      data: {
        streetAddress: "Avocado St.",
        baranggay: "Sta. Rosa I",
        city: "Marilao",
        zipCode: 3019,
        province: "Bulacan",
        contactNumber: "09123456789",
        region: "Region III",

        users: {
          create: {
            firstname: "Michael",
            lastname: "Gatmaitan",
            username: "mikael",
            password: "michealgatmaitan",
            cpNum: "09499693314",

            role: {
              create: {
                roleName: "System Admin",
              },
            },
          },
        },
      },
    });

    console.log("Branch with user & role created");
  }

  const product = await prisma.product.findFirst();

  if (!product?.id) {
    await prisma.product.create({
      data: {
        productName: "Cafe latte",
        description: "Sample description",
        price: 90,
        category: {
          create: {
            categoryName: "Coffee",
          },
        },
      },
    });

    console.log("Product created");
  }

  const rawMaterials = await prisma.rawMaterial.findFirst();
  if (!rawMaterials?.id) {
    await prisma.rawMaterial.createMany({
      data: [
        { materialName: "Milk", quantityInUnitPerItem: 1000, rawPrice: 100 },
        {
          materialName: "Coffee grounds",
          quantityInUnitPerItem: 1000,
          rawPrice: 800,
        },
        {
          materialName: "Whip Cream",
          quantityInUnitPerItem: 1000,
          rawPrice: 120,
        },
        { materialName: "Cups", quantityInUnitPerItem: 50, rawPrice: 50 },
        { materialName: "Straw", quantityInUnitPerItem: 50, rawPrice: 50 },
        { materialName: "Water", quantityInUnitPerItem: 5000, rawPrice: 30 },
      ],
    });

    console.log("Raw materials created");
  }
})();

app.post("/login", async (req: Request, res: Response) => {
  const body: { username: string; password: string } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      username: body.username,
      password: body.password,
    },
  });

  if (user === null) {
    res.json({ error: "User could not find" }).status(401);
    return;
  }

  const token = await generateToken(user);
  res.json({ token });
});

app.post("/signup", async (req: Request, res: Response) => {
  const body: ICreateUserBody = req.body;

  const newUser = await prisma.user.create({
    data: body,
  });

  console.log(newUser);

  res.json(newUser);
});

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
