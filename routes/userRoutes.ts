import express, { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/user/userController";

const route: Router = express.Router();

route.post("/", createUser);
route.get("/", getAllUsers);

route.get("/:id", getUserById);

export default route;
