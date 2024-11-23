import express, { Router, Request, Response } from "express";
import prisma from "../config/db";
import {
  getAllTransaction,
  getTransactionById,
  updateTransactionById,
} from "../controllers/transaction/transactionController";

const route: Router = express.Router();

// get transaction
route.get("/", getAllTransaction);

// get transaction by its id
route.get("/:id", getTransactionById);
// update
route.put("/:id", updateTransactionById);

export default route;
