import express, { Router } from "express";
import { createUser } from "../controllers/user/userController";

const route: Router = express.Router();

route.post("/", createUser);

export default route;
