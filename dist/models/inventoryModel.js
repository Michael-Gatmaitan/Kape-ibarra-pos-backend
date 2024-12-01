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
exports.createInventoryWithNewBatch = void 0;
const db_1 = __importDefault(require("../config/db"));
const createInventoryWithNewBatch = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { rawMaterialId, quantityInUnitPerItem, reorderLevel, batchQuantity, expirationDate, } = params;
    const newInventory = yield db_1.default.inventory.create({
        data: {
            quantityInUnit: quantityInUnitPerItem * batchQuantity,
            reorderLevel,
            stockQuantity: batchQuantity,
            rawMaterialId,
            isReorderNeeded: false,
        },
    });
    console.log("New inventory created: ", newInventory);
    const newBatch = yield db_1.default.batch.create({
        data: {
            inventoryId: newInventory.id,
            rawMaterialId,
            batchQuantity,
            expirationDate,
        },
    });
    console.log("New batch created: ", newBatch);
});
exports.createInventoryWithNewBatch = createInventoryWithNewBatch;
