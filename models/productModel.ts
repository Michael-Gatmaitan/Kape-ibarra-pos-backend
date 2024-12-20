// import prisma from "../config/db";
// import { ICreateProductBody } from "../types/types";

import prisma from "../config/db";

// export const createProductWithCategory = async ({
//   data,
// }: ICreateProductBody) => {
//   const newProduct = await prisma.product.create({
//     data,
//   });

//   return newProduct;
// };

export const getProductByCategoryName = async (categoryName: string) => {
  const products = await prisma.product.findMany({
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
};

export const getProductByProductName = async (productName: string) => {
  console.log("FInding by product name of", productName);
  const products = await prisma.product.findMany({
    where: { productName: { contains: productName.toString() } },
  });

  console.log(products);

  return products;
};

// export const getProductByCategoryNameAndProductName = async (
//   categoryName: string,
//   productName: string
// ) => {
//   const products = await prisma.product.findMany();
// };

export const updateProductAvailability = async (
  productId: string,
  availability: boolean
) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        isAvailable: availability,
      },
    });

    console.log("AVAILABILITY: ", updatedProduct);

    return updatedProduct;
  } catch (err) {
    console.log(`Error updating availability of the product: ${err}`);
  }
};
