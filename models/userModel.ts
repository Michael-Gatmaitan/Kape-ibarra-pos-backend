import { Prisma } from "@prisma/client";
import prisma from "../config/db";

// Get
export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: number) => {
  return await prisma.user.findFirst({
    where: { id },
  });
};

// Create
export const createUser = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data,
  });
};

// Update
export const updateUser = async (id: number, data: Prisma.UserUpdateInput) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

// Delete
export const deleteUserById = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};
