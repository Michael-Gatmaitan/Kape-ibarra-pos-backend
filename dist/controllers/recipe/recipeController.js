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
exports.getRecipeByProductId = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getRecipeByProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    // const { id } = req.params;
    //
    const productId = req.query.productId;
    if (productId) {
        try {
            const recipe = yield db_1.default.recipe.findMany({
                where: {
                    productId,
                },
                select: {
                    rawMaterialId: true,
                    quantityInUnitPcsNeeded: true,
                },
            });
            res.json(recipe);
        }
        catch (err) {
            console.log(err);
            res.json({ error: err });
        }
    }
});
exports.getRecipeByProductId = getRecipeByProductId;
