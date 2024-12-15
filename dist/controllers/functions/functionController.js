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
exports.calculateOrderAmount = void 0;
const db_1 = __importDefault(require("../../config/db"));
const calculateOrderAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield db_1.default.$queryRaw `CREATE OR REPLACE FUNCTION calculate_order_amount("order_id" UUID) 
    RETURNS FLOAT AS $$
    DECLARE
      total_amount FLOAT := 0;
    BEGIN
      SELECT SUM(oi."quantityAmount")
      INTO total_amount
      FROM "OrderItem" oi
      WHERE oi."orderId" = order_id;
      RETURN total_amount;
    END;
    $$ LANGUAGE plpgsql;
  `;
    console.log(request);
    res.json(request);
});
exports.calculateOrderAmount = calculateOrderAmount;
