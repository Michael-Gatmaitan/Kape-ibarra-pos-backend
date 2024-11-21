import prisma from "../config/db";

interface ICreateTransaction {
  orderId: string;
  change: number;
  paymentMethod: string;
  totalAmount: number;
  totalTendered: number;
}

export const createTransactionModel = async ({
  orderId,
  change,
  paymentMethod,
  totalAmount,
  totalTendered,
}: ICreateTransaction) => {
  const newTransaction = await prisma.transaction.create({
    data: {
      orderId,
      change,
      paymentMethod,
      totalAmount,
      totalTendered,
    },
  });

  return newTransaction;
};
