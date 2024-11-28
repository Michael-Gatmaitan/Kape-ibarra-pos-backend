import { Request, Response } from "express";
import prisma from "../../config/db";
import { Prisma } from "@prisma/client";
import { ICreateOrderBody } from "../../types/types";
import { createTransactionModel } from "../../models/transactionModel";
import {
  getLastOrder,
  getOrderByEmployeeId,
  getOrderByOrderStatus,
} from "../../models/orderModel";
import { deductInventory } from "../../models/depletionModel";

const systemEmpId = process.env.SYSTEM_EMPLOYEE_ID!;
interface ICreateOrderSelf {
  orderBody: ICreateOrderBody;
  orderItemsBody: Prisma.OrderItemCreateManyInput[];
  transactionBody: Prisma.TransactionUncheckedCreateInput;
}

/**
 *
 * @param orderBody
 *        {
 *          userId
 *          status
 *          orderType
 *        }
 * @param orderItemsBody
 *        [{
 *          productId
 *          quantity
 *          quantityAmount
 *        }]
 *
 * @param transactionBody
 *        {
 *          orderId
 *          totalAmount
 *          totalTendered,
 *          change
 *          paymentMethod
 *        }
 *
 */

export const createOrder = async (req: Request, res: Response) => {
  // transactionBody destructured

  try {
    const { orderBody, orderItemsBody }: ICreateOrderSelf = req.body;
    const { employeeId, orderStatus, orderType, diningOption } = orderBody;

    const { customerId } = orderBody;

    console.log(req.body);

    // Only walk-ins have a transaction body since they are
    // paid
    if (orderType === "walk-in") {
      const { totalAmount, totalTendered, change, paymentMethod } =
        req.body.transactionBody;

      const newOrder = await prisma.order.create({
        data: {
          employeeId,
          totalPrice: totalAmount,
          orderStatus,
          orderType,
          diningOption,

          orderItems: {
            createMany: {
              data: orderItemsBody,
            },
          },
        },
      });

      const newTransaction = await createTransactionModel({
        orderId: newOrder.id,
        change,
        totalAmount,
        totalTendered,
        paymentMethod,
      });

      console.log("New transaction created: ", newTransaction);
      console.log("YOu just made order!!!", newOrder);

      //
      deductInventory(orderItemsBody);

      res.json(newOrder);
    } else if (orderType === "online") {
      const system = await prisma.employee.findFirst({
        where: {
          id: "c65b9c9c-c016-4ef7-bfc6-c631cb7eaa9e",
        },
      });

      if (!system) {
        res.json({ message: "System id not found" }).status(401);
        return;
      }

      const newOrder = await prisma.order.create({
        data: {
          employeeId: system.id,
          customerId, // We have a customer id in online !!!
          orderStatus,
          orderType,
          diningOption,

          orderItems: {
            createMany: {
              data: orderItemsBody,
            },
          },
        },
      });

      res.json(newOrder);
    }
  } catch (err) {
    console.log(err);
    res.json({ error: `Error in creating transaction: ${err}` });
  }
};

// * /order/[id]?updateType=confirmation
export const updateOrderById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const updateType = req.query.updateType;

  try {
    const orderToUpdate = await prisma.order.findFirst({ where: { id } });

    if (!orderToUpdate) {
      res
        .json({ message: `Order to update with id of ${id} not found` })
        .status(401);
      return;
    }

    // This ensure that the order to update is from
    // customer that ordered ONLINE
    if (
      updateType &&
      updateType === "payment_confirmation" &&
      orderToUpdate.orderType === "online" &&
      orderToUpdate.employeeId === systemEmpId &&
      orderToUpdate.orderStatus === "payment pending"
    ) {
      const body: { employeeId: string } = req.body;
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: {
          employeeId: body.employeeId,
          orderStatus: "preparing",
        },
      });

      res.json(updatedOrder);
      return;
    } else if (
      updateType &&
      updateType === "mark_as_done" &&
      orderToUpdate.orderStatus === "preparing"
    ) {
      const { baristaId } = req.body;
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: {
          orderStatus: "ready",
          baristaId,
        },
      });

      console.log(`Order of ${updatedOrder.id} marked as done`);

      res.json(updatedOrder);
      return;
    }

    // ... for now, the only way to update the order is
    // by confirming it by [cashier] after seeing POP
  } catch (err) {
    res
      .json({ message: `There was an error in updating order: ${err}` })
      .status(401);
  }
};

// * /order?lastOrder=true
// * /order?employeeId=[id]
// * /order?orderStatus=[preparing | payment pending | ready]

export const getAllOrders = async (req: Request, res: Response) => {
  const employeeId = req.query.employeeId as string;
  const orderStatus = req.query.orderStatus as string;
  const lastOrder = req.query.lastOrder as string;

  try {
    if (employeeId) {
      const orders = await getOrderByEmployeeId(employeeId);
      res.json(orders);
      return;
    }

    // for returning last order
    if (lastOrder === "true") {
      const order = await getLastOrder();
      res.json(order);
      return;
    }

    if (["preparing", "payment pending", "ready"].includes(orderStatus)) {
      const orders = await getOrderByOrderStatus(orderStatus);
      res.json(orders);
      return;
    }

    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (err) {
    res.json({ error: `Error in getting all orders: ${err}` });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { orderItems, employee, customer, employeeId } = req.query;

  // if (!id) {
  //   res.json({ error: "Id is not defined" }).status(401);
  //   return;
  // }

  try {
    const order = await prisma.order.findFirst({
      where: { id },
      include: {
        orderItems:
          orderItems === "true"
            ? {
                include: { product: true },
              }
            : false,
        employee: employee === "true",
        customer: customer === "true",
      },
    });

    if (!order?.id) {
      res.json({ message: "Order do not exist." }).status(401);
      return;
    }

    res.json(order);
  } catch (err) {
    res.json({ error: `There was a problem getting order with id of ${id}` });
  }
};
