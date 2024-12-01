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
exports.getAllBatch = exports.createBatch = void 0;
const db_1 = __importDefault(require("../../config/db"));
// import prisma from "../../config/db";
// const router = express.Router();
const createBatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    body.batchQuantity = parseInt(body.batchQuantity.toString());
    const { rawMaterialId, batchQuantity, expirationDate } = body;
    try {
        const rawMaterial = yield db_1.default.rawMaterial.findUnique({
            where: { id: rawMaterialId },
        });
        if (!rawMaterial) {
            res
                .json({ message: `Cannot find raw material of id ${rawMaterialId}` })
                .status(401);
            return;
        }
        const inventory = yield db_1.default.inventory.findFirst({
            where: { rawMaterialId: rawMaterial.id },
        });
        if (!inventory) {
            res
                .json({
                message: `Cannot find inventory using rawMaterialId of ${rawMaterialId}`,
            })
                .status(401);
            return;
        }
        const inventoryStockQuantity = inventory.stockQuantity + batchQuantity;
        const inventoryQuantityUnit = inventory.quantityInUnit +
            rawMaterial.quantityInUnitPerItem * batchQuantity;
        const inventoryIsReorderNeeded = inventoryStockQuantity < inventory.reorderLevel;
        // update here
        const updatedInventory = yield db_1.default.inventory.update({
            where: { id: inventory.id },
            data: {
                stockQuantity: inventoryStockQuantity,
                quantityInUnit: inventoryQuantityUnit,
                isReorderNeeded: inventoryIsReorderNeeded,
                batches: {
                    create: {
                        rawMaterialId: rawMaterial.id,
                        batchQuantity,
                        expirationDate,
                    },
                },
            },
        });
        res.json({ updatedInventory });
    }
    catch (err) {
        res
            .json({ message: `There was an error updating inventory ${err}` })
            .status(401);
    }
});
exports.createBatch = createBatch;
const getAllBatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batches = yield db_1.default.batch.findMany();
        res.json(batches);
    }
    catch (err) {
        res
            .json({ message: `There was an error getting all batches: ${err}` })
            .status(401);
    }
});
exports.getAllBatch = getAllBatch;
