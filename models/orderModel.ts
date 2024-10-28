import { Prisma } from "@prisma/client";
import prisma from "../config/db";
import { IOrderItemCreateBody } from "../types/types";

import { OrderItem } from "@prisma/client";
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
  data: IOrderItemCreateBody
) => {
  return await prisma.orderItem.update({ where: { id }, data });
};

export const createOrder = async (
  orderBody: { branchId: number; userId: number },
  orderItemsBody: Prisma.OrderItemCreateManyInput
) => {
  // return await prisma.order.create({ data });
  const { branchId, userId } = orderBody;

  const newOrder = await prisma.order.create({
    data: {
      branchId,
      userId,
      orderStatus: false,

      orderItems: {
        createMany: {
          data: orderItemsBody,
        },
      },
    },
  });

  console.log(newOrder);
};

export const updateOrder = async (
  id: number,
  data: Prisma.OrderUpdateInput
) => {
  return await prisma.order.update({ where: { id }, data });
};
