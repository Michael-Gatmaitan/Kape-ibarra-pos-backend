import { Prisma } from "@prisma/client";
import prisma from "../config/db";

// Get
export const getAllEmployee = async () => {
  return await prisma.employee.findMany();
};

export const getEmployeeById = async (id: string) => {
  return await prisma.employee.findFirst({
    where: { id },
  });
};

// Create
export const createEmployee = async (data: Prisma.EmployeeCreateInput) => {
  return await prisma.employee.create({
    data,
  });
};

// Update
export const updateEmployee = async (
  id: string,
  data: Prisma.EmployeeUpdateInput
) => {
  return await prisma.employee.update({
    where: { id },
    data,
  });
};

// Delete
export const deleteEmployeeById = async (id: string) => {
  return await prisma.employee.delete({
    where: { id },
  });
};
