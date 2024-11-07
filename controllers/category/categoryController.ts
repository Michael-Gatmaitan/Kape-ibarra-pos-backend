import { Prisma } from "@prisma/client";
import prisma from "../../config/db";
import { Response, Request } from "express";
import { ICreateCategoryBody } from "../../types/types";

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.json(categories).status(200);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await prisma.category.findFirst({ where: { id } });

  if (!category?.id) {
    res.json({ error: "Category not found" }).status(403);
    return;
  }

  res.json(category);
};

export const createCategory = async (req: Request, res: Response) => {
  const { categoryName }: ICreateCategoryBody = req.body;

  const categoryExists = (
    await prisma.category.findFirst({
      where: { categoryName },
    })
  )?.id;

  if (categoryExists) {
    res.json({ error: "Category name exists" });
    return;
  }
  // prisma create category
  try {
    const newCategory = await prisma.category.create({
      data: { categoryName },
    });
    console.log("New Category created: ", newCategory);

    if (!newCategory.id) {
      res.json({ error: "Creation of category failed." });
      return;
    }

    res.json(newCategory).status(200);
    return;
  } catch (err) {
    res.json({ error: "Something went wrong" }).status(403);
    return;
  }
};

interface IUpdateCategoryBody {
  id: string;
  data: Prisma.CategoryUpdateInput;
}

export const updateCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data }: IUpdateCategoryBody = req.body;

  console.log("updaet in category");

  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data,
    });

    res.json(updatedCategory).status(200);
    return;
  } catch (err) {
    console.log("Update category failed: ", err);
    res.json({ error: "Deleting category failed" }).status(403);
  }
};

export const deleteCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("delete in category");

  try {
    console.log(id);
    const deletedCategory = await prisma.category.delete({ where: { id } });

    if (!deletedCategory.id) {
      res.json({ error: "Category not exists" }).status(403);
      return;
    }

    console.log("Deleted category: ", deletedCategory);
  } catch (err) {
    console.log(`Failed to delete category with id of ${id}`, err);
    res
      .json({ error: `Failed to delete category with id of ${id}` })
      .status(403);
    return;
  }
};
