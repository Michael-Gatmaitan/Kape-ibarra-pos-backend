import { Prisma } from "@prisma/client";
import prisma from "../../config/db";

export const getCategories = async () => {
  return await prisma.category.findMany();
};

export const createCategory = async (data: Prisma.CategoryCreateInput) => {
  await prisma.category.create({
    data,
  });
};

export const updateCategory = async (id: number, categoryName: string) => {
  await prisma.category.update({
    where: { id },
    data: {
      categoryName,
    },
  });
};

export const deleteCategoryById = async (id: number) => {};
