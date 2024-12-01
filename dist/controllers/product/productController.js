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
exports.deleteProductById = exports.getProductById = exports.createProduct = exports.updateProductById = exports.getProducts = void 0;
const db_1 = __importDefault(require("../../config/db"));
const productModel_1 = require("../../models/productModel");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // For product name params
    const productName = req.query.productName;
    // For category params
    const categoryParam = req.query.category;
    const categoryName = req.query.categoryName;
    try {
        const p = yield db_1.default.product.findMany({
            where: {
                AND: [
                    categoryName ? { category: { categoryName } } : {},
                    productName
                        ? {
                            productName: {
                                contains: productName.toString(),
                                mode: "insensitive",
                            },
                        }
                        : {},
                ],
            },
            include: {
                category: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        res.json(p);
        return;
        // if (categoryName) {
        //   if (categoryName === "all") {
        //     const products = await prisma.product.findMany({
        //       include: {
        //         category: true,
        //       },
        //     });
        //     res.json(products);
        //     return;
        //   }
        //   const products = await getProductByCategoryName(categoryName);
        //   res.json(products);
        //   return;
        // }
        // if (categoryParam === "true") {
        //   const products = await prisma.product.findMany({
        //     include: {
        //       category: true,
        //     },
        //   });
        //   res.json(products);
        //   return;
        // }
        // if (productName !== undefined) {
        //   console.log(productName);
        //   const products = await getProductByProductName(productName);
        //   res.json(products);
        //   return;
        // }
        // const products = await prisma.product.findMany();
        // res.json(products);
    }
    catch (err) {
        res.json({ error: `There was an error fetching product: ${err}` });
    }
});
exports.getProducts = getProducts;
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const updateAvailability = req.query.updateAvailability;
    if (updateAvailability === "true") {
        const updatedProduct = yield (0, productModel_1.updateProductAvailability)(id, true);
        res.json(updatedProduct);
        return;
    }
    else if (updateAvailability === "false") {
        const updatedProduct = yield (0, productModel_1.updateProductAvailability)(id, false);
        res.json(updatedProduct);
        return;
    }
    let { productBody, recipeBody, } = req.body;
    // if (productBody.imagePath === "") [
    // ]
    productBody.price = parseInt(productBody.price.toString());
    console.log(productBody);
    console.log("Before", recipeBody);
    recipeBody = recipeBody.map((recipe) => {
        return {
            id: recipe.id,
            rawMaterialId: recipe.rawMaterialId,
            quantityInUnitPcsNeeded: parseInt(recipe.quantityInUnitPcsNeeded.toString()),
        };
    });
    console.log(recipeBody);
    try {
        const currentProductImagePath = (_a = (yield db_1.default.product.findFirst({ where: { id } }))) === null || _a === void 0 ? void 0 : _a.imagePath;
        // const updatedProduct = await prisma.product.update({
        //   where: { id },
        //   data: {
        //     productName: productBody.productName,
        //     description: productBody.description,
        //     categoryId: productBody.categoryId,
        //     imagePath:
        //       productBody.imagePath === ""
        //         ? currentProductImagePath
        //         : productBody.imagePath,
        //     price: productBody.price,
        //     recipes: {
        //       upsert: recipeBody.map((recipe) => ({
        //         where: { id: recipe.id ?? randomUUID() }, // Use randomUUID() if id is missing
        //         update: {
        //           rawMaterialId: recipe.rawMaterialId,
        //           quantityInUnitPcsNeeded: recipe.quantityInUnitPcsNeeded,
        //         },
        //         create: {
        //           id: recipe.id || randomUUID(), // Ensure UUID generation if id is null/undefined
        //           rawMaterialId: recipe.rawMaterialId,
        //           quantityInUnitPcsNeeded: recipe.quantityInUnitPcsNeeded,
        //         },
        //       })),
        //       deleteMany: {
        //         id: { notIn: recipeBody.map((r) => r.id).filter(Boolean) },
        //       },
        //     },
        //   },
        //   include: {
        //     recipes: true,
        //   },
        // });
        // const updatedProduct = await prisma.product.upsert({
        // })
        // console.log("Update: ", updatedProduct);
        // res.json(updatedProduct);
        res.json({ message: "hotdog" });
        return;
    }
    catch (err) {
        res
            .json({ error: `Error in updating product with recipes ${err}` })
            .status(500);
        return;
    }
});
exports.updateProductById = updateProductById;
// "Error in updating product with recipes PrismaClientKnownRequestError:
// Invalid `prisma.product.update()` invocation in
// C:\Users\Michael\Desktop\Projects\ibarra_pos\backend\controllers\product\productController.ts:138:49
//   135 const currentProductImagePath = (
//   136   await prisma.product.findFirst({ where: { id } })
//   137 )?.imagePath;
// → 138 const updatedProduct = await prisma.product.update(
// Inconsistent column data: Error creating UUID, invalid length: expected length 32 for simple format, found 0"
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { productBody, recipeBody } = req.body;
    const productExisted = yield db_1.default.product.findFirst({
        where: {
            productName: productBody.productName,
        },
    });
    if (productExisted === null || productExisted === void 0 ? void 0 : productExisted.id) {
        res.json({ error: "Product already existed" }).status(400);
        return;
    }
    productBody.price = parseInt(productBody.price.toString());
    recipeBody = recipeBody.map((recipe) => {
        return {
            // id: recipe.id,
            rawMaterialId: recipe.rawMaterialId,
            quantityInUnitPcsNeeded: parseInt(recipe.quantityInUnitPcsNeeded),
        };
    });
    const newProduct = yield db_1.default.product.create({
        data: Object.assign(Object.assign({}, productBody), { isAvailable: true, recipes: {
                createMany: {
                    data: recipeBody,
                },
            } }),
    });
    console.log("Create:", newProduct);
    if (!newProduct.id) {
        res.json({ error: "Creation of new product failed." });
    }
    res.json(newProduct);
});
exports.createProduct = createProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Get product's recipe information
    if (req.query.mode === "edit") {
        const product = yield db_1.default.product.findFirst({
            where: { id },
            include: {
                recipes: true,
            },
        });
        res.json(product);
        return;
    }
    const product = yield db_1.default.product.findFirst({
        where: { id },
    });
    if (!(product === null || product === void 0 ? void 0 : product.id)) {
        res.json({ error: "Product not exists" }).status(400);
        return;
    }
    res.json(product);
});
exports.getProductById = getProductById;
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedProduct = yield db_1.default.product.delete({
            where: { id },
        });
        if (!(deletedProduct === null || deletedProduct === void 0 ? void 0 : deletedProduct.id)) {
            res.json({ error: "Product not extists" }).status(403);
            return;
        }
        console.log("Deleted product: ", deletedProduct);
        res.json(deletedProduct);
        return;
    }
    catch (err) {
        res
            .status(403)
            .json({ error: `Error has occured in deleting product ${err}` });
        return;
    }
});
exports.deleteProductById = deleteProductById;
