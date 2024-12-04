import express, { Router, Request, Response } from "express";
import {
  createTransaction,
  getAllTransaction,
  getTransactionById,
  updateTransactionById,
} from "../controllers/transaction/transactionController";

const route: Router = express.Router();

// get transaction
route.get("/", getAllTransaction);
route.post("/", createTransaction);

// get transaction by its id
route.get("/:id", getTransactionById);
// update
route.put("/:id", updateTransactionById);

export default route;
