import express, { Router } from "express";
import {
  createEmployee,
  getAllEmployee,
  getEmployeeById,
} from "../controllers/user/employeeController";

const route: Router = express.Router();

route.post("/", createEmployee);
route.get("/", getAllEmployee);

route.get("/:id", getEmployeeById);

export default route;
