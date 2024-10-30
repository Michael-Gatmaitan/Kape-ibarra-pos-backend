import { Prisma } from "@prisma/client";
import prisma from "../config/db";
import { IUpdateOrderItemBody } from "../types/types";
// OrderItem and Orders will implemented here

// We will base all of the id on USER eg cashier

// ? Multiple orderItems in 1 order

// Get
export const getOrderItems = async () => {
  return await prisma.orderItem.findMany();
};

export const getOrderItemsById = async (id: number) => {
  return await prisma.orderItem.findFirst({ where: { id } });
};

// Delete
export const deleteOrderItem = async (id: number) => {
  return await prisma.orderItem.delete({ where: { id } });
};

export const updateOrderItem = async (
  id: number,
  orderItemBody: IUpdateOrderItemBody
) => {
  return await prisma.orderItem.update({ where: { id }, data: orderItemBody });
};

// Single or multiple orderItems for single order
// export const createOrderWithOrderItems = async ({
//   branchId,
//   userId,
//   orderItems,
// }: ICreateOrderBody) => {

//   });

//   console.log(newOrder);

//   return newOrder;
// };

export const updateOrder = async (
  id: number,
  data: Prisma.OrderUpdateInput
) => {
  return await prisma.order.update({ where: { id }, data });
};
