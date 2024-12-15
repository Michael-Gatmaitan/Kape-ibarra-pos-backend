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
exports.getOrderByCustomerId = exports.getTotalOrders = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getTotalOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customView = yield db_1.default.$queryRaw `
    CREATE OR REPLACE VIEW raw_material_usage AS
    SELECT r."materialName", pr."productName", sum(rec."quantityInUnitPcsNeeded") AS total_quantity_needed
    FROM
        "Recipe" rec
        JOIN "RawMaterial" r ON rec."rawMaterialId" = r."id"
        JOIN "Product" pr ON rec."productId" = pr."id"
    GROUP BY
        r."materialName",
        pr."productName";
  `;
    console.log(customView);
    res.json(customView);
});
exports.getTotalOrders = getTotalOrders;
const getOrderByCustomerId = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getOrderByCustomerId = getOrderByCustomerId;
