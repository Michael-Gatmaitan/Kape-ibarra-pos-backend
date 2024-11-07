import prisma from "../../config/db";
import { Request, Response } from "express";
import { randomUUID } from "crypto";

/**
 * Req body should
 *    categoryId: number;
 *    price: number;
 *    productName: string;
 */
interface IProductBody {
  productName: string;
  price: number;
  description?: string;
  categoryId: string;
}

export const getOrders = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();

  res.json(products);
};

export const updateProductById = async (req: Request, res: Response) => {
  let {
    productBody,
    recipeBody,
  }: {
    productBody: IProductBody;
    recipeBody: {
      id: string;
      rawMaterialId: string;
      quantityInUnitPcsNeeded: number;
    }[];
  } = req.body;

  const id = req.params.id as string;

  productBody.price = parseInt(productBody.price.toString());

  recipeBody = recipeBody.map((recipe) => {
    return {
      id: recipe.id,
      rawMaterialId: recipe.rawMaterialId,
      quantityInUnitPcsNeeded: parseInt(
        recipe.quantityInUnitPcsNeeded.toString()
      ),
    };
  });

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        // ...productBody,
        productName: productBody.productName,
        description: productBody.description,
        categoryId: productBody.categoryId,
        price: productBody.price,
        recipes: {
          upsert: recipeBody.map((recipe) => ({
            where: { id: recipe.id || randomUUID() },
            update: {
              rawMaterialId: recipe.rawMaterialId,
              quantityInUnitPcsNeeded: recipe.quantityInUnitPcsNeeded,
            },
            create: {
              id: recipe.id,
              rawMaterialId: recipe.rawMaterialId,
              quantityInUnitPcsNeeded: recipe.quantityInUnitPcsNeeded,
            },
          })),
          deleteMany: {
            id: { notIn: recipeBody.map((r) => r.id).filter(Boolean) },
          },
        },
      },
      include: {
        recipes: true,
      },
    });
    res.json(updatedProduct);
    return;
  } catch (err) {
    res.status(500).json({ error: "Error in updating product with recipes" });
    return;
  }
};

export const createProduct = async (req: Request, res: Response) => {
  let { productBody, recipeBody } = req.body;

  const productExisted = await prisma.product.findFirst({
    where: {
      productName: productBody.productName,
    },
  });

  if (productExisted?.id) {
    res.json({ error: "Product already existed" }).status(400);
    return;
  }

  productBody.price = parseInt(productBody.price.toString());

  recipeBody = recipeBody.map(
    (recipe: {
      id: string;
      rawMaterialId: string;
      quantityInUnitPcsNeeded: string;
    }) => {
      return {
        id: recipe.id,
        rawMaterialId: recipe.rawMaterialId,
        quantityInUnitPcsNeeded: parseInt(recipe.quantityInUnitPcsNeeded),
      };
    }
  );

  const newProduct = await prisma.product.create({
    data: {
      ...productBody,
      recipes: {
        createMany: {
          data: recipeBody,
        },
      },
    },
  });

  if (!newProduct.id) {
    res.json({ error: "Creation of new product failed." });
  }

  res.json(newProduct);
};

export const getProductById = async (req: Request, res: Response) => {
  console.log(req.params.id);

  const { id } = req.params;

  // Get product's recipe information
  if (req.query.mode === "edit") {
    const product = await prisma.product.findFirst({
      where: { id },
      include: {
        recipes: true,
      },
    });

    res.json(product);
    return;
  }

  const product = await prisma.product.findFirst({
    where: { id },
  });

  if (!product?.id) {
    res.json({ error: "Product not exists" }).status(400);
    return;
  }

  res.json(product);
};

export const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    if (!deletedProduct?.id) {
      res.json({ error: "Product not extists " }).status(400);
    }

    console.log(deletedProduct);
    res.json(deletedProduct);
    return;
  } catch (err) {
    res.status(401).json({ error: "Error has occured in deleting product" });
    return;
  }
};
