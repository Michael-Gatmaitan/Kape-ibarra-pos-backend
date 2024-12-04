import express, { Router } from "express";
import {
  getEWallet,
  updateEWallet,
} from "../controllers/e-wallet/eWalletController";

const router: Router = express.Router();

router.get("/", getEWallet);
router.put("/", updateEWallet);

export default router;
