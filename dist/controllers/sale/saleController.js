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
exports.getSales = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield db_1.default.sales.findMany();
        res.json(sales);
    }
    catch (err) {
        const message = `There was an error getting sales ${err}`;
        console.log(message);
        res.json({ message }).status(401);
    }
});
exports.getSales = getSales;
