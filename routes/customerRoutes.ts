import express, { Router } from "express";
import {
  getAllCustomers,
  getCustomerById,
} from "../controllers/customer/customerController";

const router = express.Router();

router.get("/", getAllCustomers);
router.get("/:id", getCustomerById);

export default router;
