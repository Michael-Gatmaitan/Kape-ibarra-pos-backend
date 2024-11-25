import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Routes
import orderRoute from "./routes/orderRoutes";
import productRoute from "./routes/productRoutes";
import categoryRoute from "./routes/categoryRoutes";
import roleRoute from "./routes/roleRoutes";
import rawMaterialRoute from "./routes/rawMaterialRoutes";
import recipeRoute from "./routes/recipeRoutes";
import employeeRoute from "./routes/employeeRoutes";
import transactionRoute from "./routes/transactionRoutes";
import customerRoute from "./routes/customerRoutes";

import prisma from "./config/db";
import { generateToken } from "./auth/jwt";

import { Server } from "socket.io";
import { createServer } from "http";
import { ICreateEmployeeBody } from "./types/types";

const app: Application = express();

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Connected: ", socket.id);

  socket.on("count", (data, callback) => {
    console.log(data);
    callback("recieved");
  });
});
io.on("count", (data) => console.log("HII!", data));

app.use(express.json());
app.use(cors());
app.use(cookieParser());

dotenv.config();

const PORT = process.env.PORT || 9999;

app.get("/", (req: Request, res: Response) => {
  res.json("Hello world");
});

app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.use("/order", orderRoute);
app.use("/role", roleRoute);
app.use("/raw-material", rawMaterialRoute);
app.use("/recipe", recipeRoute);
app.use("/employee", employeeRoute);
app.use("/transaction", transactionRoute);
app.use("/customer", customerRoute);

(async function () {
  const role = await prisma.role.findFirst({
    where: {
      roleName: { in: ["Cashier", "Barista", "Customer"] },
    },
  });

  if (!role?.id) {
    await prisma.role.createMany({
      data: [
        { roleName: "Manager" },
        { roleName: "Cashier" },
        { roleName: "Barista" },
      ],
    });

    console.log("Roles created");
  }

  const systemPh = await prisma.employee.findFirst({
    where: { id: "c65b9c9c-c016-4ef7-bfc6-c631cb7eaa9e" },
  });

  if (!systemPh) {
    await prisma.employee.create({
      data: {
        id: "c65b9c9c-c016-4ef7-bfc6-c631cb7eaa9e",
        firstname: "System",
        lastname: "System",
        phoneNumber: "System",
        imagePath: "",
        username: "sys",
        password: "sys",
        role: {
          create: {
            roleName: "System",
          },
        },
      },
    });
  }

  const employee = await prisma.employee.findFirst({
    where: { username: "micheal29" },
  });

  if (!employee?.id) {
    await prisma.employee.create({
      data: {
        firstname: "Michael",
        lastname: "Gatmaitan",
        username: "micheal29",
        password: "michealgatmaitan",
        phoneNumber: "09499693314",
        role: {
          create: {
            roleName: "Admin",
          },
        },
        imagePath: "",
      },
    });
  }

  // Sample customer
  const customer = await prisma.customer.findFirst();
  if (!customer) {
    await prisma.customer.create({
      data: {
        email: "fidelrevo@gmail.com",
        firstname: "Fidel",
        lastname: "Revo",
        username: "remvo123",
        password: "fidelrevo",
        phoneNumber: "09123456789",
        gender: "Male",
      },
    });
  }

  const categories = await prisma.category.findMany();
  if (categories.length !== 3) {
    await prisma.category.createMany({
      data: [
        { categoryName: "Coffee" },
        { categoryName: "Non-Coffee" },
        { categoryName: "Milk tea" },
      ],
    });
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

  const employee = await prisma.employee.findFirst({
    where: {
      username: body.username,
      password: body.password,
    },
  });

  if (employee === null) {
    res.json({ error: "User could not find" }).status(401);
    return;
  }

  const token = await generateToken(employee);
  res.json({ token });
});

// app.post("/signup", async (req: Request, res: Response) => {
//   const body: ICreateEmployeeBody = req.body;

//   const newEmployee = await prisma.employee.create({
//     data: body,
//   });

//   console.log(newEmployee);

//   res.json(newEmployee);
// });

// app.listen(PORT, () => {
//   console.log(`Connected to port ${PORT}`);
// });

server.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});

module.exports = app;
