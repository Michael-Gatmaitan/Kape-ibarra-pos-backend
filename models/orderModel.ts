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
    include: {
      customer: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return orders;
};

export const getOrderByEmployeeId = async (employeeId: string) => {
  const orders = await prisma.order.findMany({
    where: { employeeId },
  });

  return orders;
};

export const createOnlineOrder = async ({
  customerId,
  orderStatus,
  orderType,
  diningOption,
  proofOfPaymentImg,
  orderItemsBody,
}: {
  customerId: string | null | undefined;
  orderStatus: string | undefined;
  orderType: string;
  diningOption: string;
  proofOfPaymentImg: string | null | undefined;
  orderItemsBody: Prisma.OrderItemCreateManyInput[];
}) => {
  try {
    const system = await prisma.employee.findFirst({
      where: { id: "c65b9c9c-c016-4ef7-bfc6-c631cb7eaa9e" },
    });

    if (!system) {
      return { message: "System id not found" };
    }

    console.log("payment url", proofOfPaymentImg);

    const newOrder = await prisma.order.create({
      data: {
        employeeId: system.id,
        customerId, // We have a customer id in online !!!
        orderStatus,
        orderType,
        diningOption,
        proofOfPaymentImg,

        orderItems: {
          createMany: {
            data: orderItemsBody,
          },
        },
      },
    });

    return newOrder;
  } catch (err) {
    const errResult = `There was an error creating online order: ${err}`;
    console.log(errResult);
    return { message: errResult };
  }
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
