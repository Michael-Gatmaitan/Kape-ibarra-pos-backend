import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import userRoute from "./routes/userRoutes";
import orderRoute from "./routes/orderRoutes";
import productRoute from "./routes/productRoutes";
import categoryRoute from "./routes/categoryRoutes";
import branchRoute from "./routes/branchRoutes";
import roleRoute from "./routes/roleRoutes";
import rawMaterialRoute from "./routes/rawMaterialRoutes";

import prisma from "./config/db";
import { generateToken } from "./auth/jwt";
// import { generateToken } from "./auth/jwt";

import { Server } from "socket.io";
import { createServer } from "http";

const app: Application = express();

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => console.log("Connected: ", socket.id));

app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 9999;

app.use("/user", userRoute);
app.use("/branch", branchRoute);
app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.use("/order", orderRoute);
app.use("/role", roleRoute);
app.use("/rawMaterial", rawMaterialRoute);

// app.use("/user", userRouter);

// Setup initial db

// Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
//   next(err);
// })

// Initialize roles

// app.use("/", async (_: Request, res: Response) => {
//   res.send(await prisma.role.findMany());
// });

// app.get("/profile", verifyToken, (req, res) => {});

// io.on("connection", () => console.log("A user connected"));

// app.post("/product/categories/add", async (req, res) => {
//   const { categoryName }: { categoryName: string } = req.body;

//   console.log("afdlkasdflk jal; ");

//   const newCategory = await prisma.category.create({
//     data: {
//       categoryName,
//     },
//   });

//   io.emit("newCategory", newCategory);

//   res.json({ newCategory });
// });

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

  const generated = await generateToken(user);

  res.json({ token: generated });
});

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
