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
exports.deductInventory = void 0;
const db_1 = __importDefault(require("../config/db"));
const deductInventory = (orderItems) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("Depletionsssss: ", orderItems);
    orderItems.forEach((orderItem) => {
        handleDeduction(orderItem.productId, orderItem.quantity);
    });
});
exports.deductInventory = deductInventory;
const handleDeduction = (productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield db_1.default.recipe.findMany({
        where: {
            productId,
        },
    });
    recipes.forEach((recipe) => __awaiter(void 0, void 0, void 0, function* () {
        const quantityToDeduct = recipe.quantityInUnitPcsNeeded * quantity;
        console.log(`${quantityToDeduct} * ${quantity} = ${quantityToDeduct * quantity}`);
        console.log(recipe.rawMaterialId);
        const rawMaterial = yield db_1.default.rawMaterial.findFirst({
            where: { id: recipe.rawMaterialId },
        });
        const inv = yield db_1.default.inventory.findFirst({
            where: {
                rawMaterialId: recipe.rawMaterialId,
            },
        });
        if (!inv || !rawMaterial)
            return;
        const updatedStockQuantity = Math.floor(inv.quantityInUnit / rawMaterial.quantityInUnitPerItem);
        if (updatedStockQuantity < inv.reorderLevel) {
        }
        const updated = yield db_1.default.inventory.update({
            where: { id: inv.id },
            data: {
                quantityInUnit: {
                    decrement: quantityToDeduct,
                },
                stockQuantity: updatedStockQuantity,
                isReorderNeeded: updatedStockQuantity < inv.reorderLevel,
            },
        });
        console.log(updated, quantityToDeduct);
    }));
});
