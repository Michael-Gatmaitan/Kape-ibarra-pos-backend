import prisma from "../config/db";
import { IOrder, IOrderItem } from "../types/types";
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

// export const createOrderItems = async (data: IOrderItem[]) => {
//   return await prisma.orderItem.createMany({

//   })
// }

export const createOrderItems = async (data: IOrderItem[]) => {
  return await prisma.orderItem.createManyAndReturn({
    data,
  });
};
// Create
export const createOrderItem = async (data: IOrderItem) => {
  return await prisma.orderItem.create({ data });
};

// Delete
export const deleteOrderItem = async (id: number) => {
  return await prisma.orderItem.delete({ where: { id } });
};

export const updateOrderItem = async (id: number, data: IOrderItem) => {
  return await prisma.orderItem.update({ where: { id }, data });
};

// For Order

export const createOrder = async (data: IOrder) => {
  return await prisma.order.create({ data });
};

export const updateOrder = async (id: number, data: IOrder) => {
  return await prisma.order.update({ where: { id }, data });
};

// export const createOrders = async (data: IOrder[]) => {
//   return await prisma.order.createManyAndReturn({
//     data
//   });
// }

export const createManyOrderItemsAndReferenceToNewOrder = async (
  data: IOrderItem[]
) => {
  await prisma.order.create({
    data: {
      branchId: 1,
      customerId: 1,
      totalPrice: 0,
      orderStatus: false,
      userId: 1,

      orderItems: {
        createMany: {
          data,
        },
      },
    },
  });
};
