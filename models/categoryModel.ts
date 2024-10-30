import prisma from "../config/db";
import { IUpdateCategoryBody } from "../controllers/category/categoryController";
import { ICreateCategoryBody } from "../types/types";

export const createCategoryModel = async (data: ICreateCategoryBody) => {
  return await prisma.category.create({ data });
};

export const updateCategoryModel = async ({
  id,
  data,
}: IUpdateCategoryBody) => {
  await prisma.category.update({
    where: { id },
    data,
  });
};

// export const updateCategoryModel = async ({});
