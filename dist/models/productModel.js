"use strict";
// import prisma from "../config/db";
// import { ICreateProductBody } from "../types/types";
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
exports.getProductByCategoryNameAndProductName = exports.getProductByProductName = exports.getProductByCategoryName = void 0;
const db_1 = __importDefault(require("../config/db"));
// export const createProductWithCategory = async ({
//   data,
// }: ICreateProductBody) => {
//   const newProduct = await prisma.product.create({
//     data,
//   });
//   return newProduct;
// };
const getProductByCategoryName = (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield db_1.default.product.findMany({
        where: {
            category: {
                categoryName: categoryName,
            },
        },
        include: {
            category: true,
        },
    });
    return products;
});
exports.getProductByCategoryName = getProductByCategoryName;
const getProductByProductName = (productName) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("FInding by product name of", productName);
    const products = yield db_1.default.product.findMany({
        where: { productName: { contains: productName.toString() } },
    });
    console.log(products);
    return products;
});
exports.getProductByProductName = getProductByProductName;
const getProductByCategoryNameAndProductName = (categoryName, productName) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield db_1.default.product.findMany();
});
exports.getProductByCategoryNameAndProductName = getProductByCategoryNameAndProductName;
