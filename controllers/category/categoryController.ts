import { Prisma } from "@prisma/client";
import prisma from "../../config/db";
import { Response, Request } from "express";
import {
  createCategoryModel,
  updateCategoryModel,
} from "../../models/categoryModel";
import { ICreateCategoryBody } from "../../types/types";

export const getCategories = async () => {
  return await prisma.category.findMany();
};

export const createCategory = async (req: Request, res: Response) => {
  const body: ICreateCategoryBody = req.body;
  const newCategory = await createCategoryModel(body);
  console.log(newCategory);

  if (!newCategory.id) {
    res.json({ error: "Creation of category failed." });
  }

  res.json({ newCategory });
};

export interface IUpdateCategoryBody {
  id: number;
  data: Prisma.CategoryUpdateInput;
}
export const updateCategory = async (req: Request, res: Response) => {
  const body: IUpdateCategoryBody = req.body;

  await updateCategoryModel(body);
};

export const deleteCategoryById = async (id: number) => {};
