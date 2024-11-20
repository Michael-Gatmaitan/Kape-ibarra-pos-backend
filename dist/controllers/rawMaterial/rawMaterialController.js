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
exports.deleteRawMaterialById = exports.updateRawMaterialById = exports.createRawMaterial = exports.getRawMaterialById = exports.getRawMaterials = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getRawMaterials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.rawMaterial.findMany();
    res.json(result);
});
exports.getRawMaterials = getRawMaterials;
const getRawMaterialById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const rawMaterial = yield db_1.default.rawMaterial.findFirst({ where: { id } });
        if (!(rawMaterial === null || rawMaterial === void 0 ? void 0 : rawMaterial.id)) {
            res.json({ error: `Raw material with ${id} not found` }).status(403);
            return;
        }
        res.json(rawMaterial);
    }
    catch (err) {
        console.log(err);
        res
            .json({
            error: `Something went wrong getting raw material by id of ${id}`,
        })
            .status(403);
    }
});
exports.getRawMaterialById = getRawMaterialById;
const createRawMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Search for the raw materials first if it is EXISTED
    // if not, create it.
    const body = req.body;
    body.quantityInUnitPerItem = parseInt(body.quantityInUnitPerItem.toString());
    body.rawPrice = parseInt(body.rawPrice.toString());
    const rawMaterialExists = (_a = (yield db_1.default.rawMaterial.findFirst({
        where: { materialName: body.materialName },
    }))) === null || _a === void 0 ? void 0 : _a.id;
    if (rawMaterialExists) {
        res.json({ error: "Raw material exists" });
        console.log(rawMaterialExists);
        return;
    }
    // Create raw material
    try {
        console.log(body);
        const newRawMaterial = yield db_1.default.rawMaterial.create({
            data: body,
        });
        res.json(newRawMaterial);
    }
    catch (error) {
        console.log(error);
        res.json({ error: `Failed to create raw material ${error}` });
    }
});
exports.createRawMaterial = createRawMaterial;
const updateRawMaterialById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rawMaterialBody = req.body;
    rawMaterialBody.rawPrice = parseInt(rawMaterialBody.rawPrice.toString());
    rawMaterialBody.quantityInUnitPerItem = parseInt(rawMaterialBody.quantityInUnitPerItem.toString());
    const { materialName, rawPrice, quantityInUnitPerItem } = rawMaterialBody;
    console.log(rawMaterialBody);
    try {
        // Update raw material
        const updatedRawMaterial = yield db_1.default.rawMaterial.update({
            where: { id },
            data: {
                materialName,
                rawPrice,
                quantityInUnitPerItem,
            },
        });
        console.log(updatedRawMaterial);
        res.json(updatedRawMaterial);
    }
    catch (error) {
        console.log("Something went wrong updating raw material");
        res.json({
            error: `Something went wrong updating raw material with id of ${id}`,
        });
    }
});
exports.updateRawMaterialById = updateRawMaterialById;
const deleteRawMaterialById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedRawMaterial = yield db_1.default.rawMaterial.delete({ where: { id } });
    console.log(deletedRawMaterial);
    res.json(deletedRawMaterial);
});
exports.deleteRawMaterialById = deleteRawMaterialById;
