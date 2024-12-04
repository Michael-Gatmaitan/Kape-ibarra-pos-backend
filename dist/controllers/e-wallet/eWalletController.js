"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEWallet = exports.getEWallet = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getEWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ewallet = yield db_1.default.eWallet.findFirst();
        res.json(ewallet);
    }
    catch (err) {
        console.log(`There was an error getting e-wallet: ${err}`);
        res
            .json({ message: `There was an error getting e-wallet: ${err}` })
            .status(401);
    }
});
exports.getEWallet = getEWallet;
const updateEWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { name, phoneNumber } = body;
    try {
        console.log(body);
        const ewallet = yield db_1.default.eWallet.findFirst();
        if (!ewallet) {
            const newEwallet = yield db_1.default.eWallet.create({
                data: { name, phoneNumber },
            });
            res.json(newEwallet);
            return;
        }
        const updatedEWallet = yield db_1.default.eWallet.update({
            where: { id: ewallet.id },
            data: { name, phoneNumber },
        });
        res.json(updatedEWallet);
    }
    catch (err) {
        console.log(`There was an error updating e-wallet: ${err}`);
        res.json(`There was an error updating e-wallet: ${err}`).status(401);
    }
});
exports.updateEWallet = updateEWallet;
