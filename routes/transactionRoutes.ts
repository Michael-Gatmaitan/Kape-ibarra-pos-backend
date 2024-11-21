import express, { Router, Request, Response } from "express";
import prisma from "../config/db";
import { getAllTransaction } from "../controllers/transaction/transactionController";

const route: Router = express.Router();

route.get("/", getAllTransaction);

export default route;
