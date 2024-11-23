import { Prisma } from "@prisma/client";
import prisma from "../config/db";

// export interface IBranch {
//   id: string;
//   streetAddress: string;
//   baranggay: string;
//   city: string;
//   zipCode: number;
// }

export interface IExpense {
  id: string;
  totalExpensesPerDayId: string;
  expenseAmount: number;
}

export interface IInventory {
  id: string;
  // branchId: string;
  rawMaterialId: string;
  quantityInUnit: number;
  stockQuantity: number;
  isReorderNeeded: boolean;
}

export interface IOrder {
  id: string;
  orderedAt: string;
  // branchId: string;
  userId: string;
  customerId: string;
  userNumber: string;
  totalPrice: number;
  proofOfPaymentImg?: string;
  orderType: "walk-in" | "online";
  orderStatus: "preparing" | "payment pending" | "ready to pickup" | "rejected";
}

// export type OrderCreate = Pick<IOrder, "branchId" | "userId">;

export interface IOrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  quantityAmount: number;
}

export type OrderItemCreate = Pick<IOrderItem, "quantityAmount" | "quantity">;

export interface ICategory {
  id: string;
  categoryName: string;
}

export interface IProduct {
  id: string;
  imagePath: string;
  catergoryId: string;
  // -- PLU0
  productName: string;
  price: number;
  description?: string;
  createdAt: string;
}

export interface IRawMaterial {
  id: string;
  materialName: string;
  quantityInUnitPerItem: number;
}

export interface IRecipe {
  id: string;
  productId: string;
  rawMaterialId: string;
  quantityInUnitPcsNeeded: number;
}
export interface IRole {
  id: string;
  rolename: string;
}
export interface ITotalExpensesPerDay {
  id: string;
  // branchId: string;
  days: number;
  date: string;
  totalExpenses: number;
}
export interface ITransaction {
  id: string;
  orderId: string;
  // branchId: string;
  paymentMethod: string;
  amountPaid: string;
}
export interface IEmployee {
  id: string;
  roleId: string;
  // branchId: string;
  firstname: string;
  lastname: string;
  cpNum: string;
  username: string;
  password: string;
}
export interface IBatch {
  id: string;
  inventoryId: string;
  batchQuantity: number;
  expirationDate: string;
  recievedDate: string;
  daysUntilExpiration: number;
  notifWarning: boolean;
  isExpired: boolean;
  isDisposed: boolean;
}
export interface ISystemNotification {
  id: string;
  inventoryId: string;
  notificationDate: string;
  stauts: string;
  isSolved: boolean;
}

// export type ICreateBranchBody = Prisma.BranchUncheckedCreateInput;

export type ICreateProductBody = Prisma.ProductUncheckedCreateInput;

export type ICreateOrderBody = Prisma.OrderUncheckedCreateInput;

export type ICreateOrderItemBody = Prisma.OrderItemUncheckedCreateInput;

export type ICreateCategoryBody = Prisma.CategoryUncheckedCreateInput;

export type ICreateRecipeBody = Prisma.RecipeUncheckedCreateInput;

export type ICreateRoleBody = Prisma.RoleUncheckedCreateInput;

export type ICreateEmployeeBody = Prisma.EmployeeUncheckedCreateInput;

export type ICreateRawMaterialBody = Prisma.RawMaterialUncheckedCreateInput;

// Update

export type IUpdateOrderItemBody = Prisma.OrderItemUncheckedUpdateInput;
