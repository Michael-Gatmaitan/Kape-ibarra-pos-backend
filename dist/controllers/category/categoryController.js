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
exports.deleteCategoryById = exports.updateCategoryById = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield db_1.default.category.findMany({
        include: {
            products: true,
        },
    });
    res.json(categories).status(200);
});
exports.getCategories = getCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield db_1.default.category.findFirst({ where: { id } });
    if (!(category === null || category === void 0 ? void 0 : category.id)) {
        res.json({ error: "Category not found" }).status(403);
        return;
    }
    res.json(category);
});
exports.getCategoryById = getCategoryById;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { categoryName } = req.body;
    const categoryExists = (_a = (yield db_1.default.category.findFirst({
        where: { categoryName },
    }))) === null || _a === void 0 ? void 0 : _a.id;
    if (categoryExists) {
        res.json({ error: "Category name exists" });
        return;
    }
    // prisma create category
    try {
        const newCategory = yield db_1.default.category.create({
            data: { categoryName },
        });
        console.log("New Category created: ", newCategory);
        if (!newCategory.id) {
            res.json({ error: "Creation of category failed." });
            return;
        }
        res.json(newCategory).status(200);
        return;
    }
    catch (err) {
        res.json({ error: "Something went wrong" }).status(403);
        return;
    }
});
exports.createCategory = createCategory;
const updateCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { data } = req.body;
    console.log("updaet in category");
    try {
        const updatedCategory = yield db_1.default.category.update({
            where: { id },
            data,
        });
        res.json(updatedCategory).status(200);
        return;
    }
    catch (err) {
        console.log("Update category failed: ", err);
        res.json({ error: "Deleting category failed" }).status(403);
    }
});
exports.updateCategoryById = updateCategoryById;
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("delete in category");
    try {
        console.log(id);
        const deletedCategory = yield db_1.default.category.delete({ where: { id } });
        if (!deletedCategory.id) {
            res.json({ error: "Category not exists" }).status(403);
            return;
        }
        console.log("Deleted category: ", deletedCategory);
    }
    catch (err) {
        console.log(`Failed to delete category with id of ${id}`, err);
        res
            .json({ error: `Failed to delete category with id of ${id}` })
            .status(403);
        return;
    }
});
exports.deleteCategoryById = deleteCategoryById;
