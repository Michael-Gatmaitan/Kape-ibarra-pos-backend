import { Prisma } from "@prisma/client";
import prisma from "../config/db";
import { IUpdateOrderItemBody } from "../types/types";
// OrderItem and Orders will implemented here

// We will base all of the id on USER eg cashier

// ? Multiple orderItems in 1 order

// Get
export const getLastOrder = async () => {
  const order = await prisma.order.findMany({
    select: {
      customerNumber: true,
    },
    orderBy: {
      customerNumber: "desc",
    },
    take: 1,
  });

  return order;
};

export const getOrderByOrderStatus = async (orderStatus: string) => {
  const orders = await prisma.order.findMany({
    where: { orderStatus },
  });

  return orders;
};

export const getOrderByEmployeeId = async (employeeId: string) => {
  const orders = await prisma.order.findMany({
    where: { employeeId },
  });

  return orders;
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
