import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
// import orderRoute from "./routes/orderRoutes";
// import userRouter from "./controllers/user/user";
// import { IUser } from "./types/types";
import { generateToken } from "./auth/jwt";

const app: Application = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 9999;

// app.use("/order", orderRoute);
// app.use("/user", userRouter);

// Setup initial db

// Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
//   next(err);
// })

app.get("/", (_: Request, res: Response) => {
  res.send("hgotdog ni michael");
});

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

  const generated = generateToken(user);

  res.json({ token: generated });

  // console.log(req.headers["authorization"]);
  // return both generatedKey and
});

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
