import prisma from "../config/db";
import { IUser, UserCreateBody } from "../types/types";

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
export const createUser = async (data: UserCreateBody) => {
  return await prisma.user.create({
    data,
  });
};

// Update
export const updateUser = async (id: number, data: UserCreateBody) => {
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
