import { Prisma } from "@prisma/client";
import prisma from "../config/db";

export interface IBranch {
  id: number;
  streetAddress: string;
  baranggay: string;
  city: string;
  zipCode: number;
}

export interface IExpense {
  id: number;
  totalExpensesPerDayId: number;
  expenseAmount: number;
}

export interface IInventory {
  id: number;
  branchId: number;
  rawMaterialId: number;
  quantityInUnit: number;
  stockQuantity: number;
  isReorderNeeded: boolean;
}

export interface IOrder {
  id: number;
  orderedAt: string;
  branchId: number;
  userId: number;
  customerId: number;
  userNumber: string;
  totalPrice: number;
  orderStatus: boolean;
}

export type OrderCreate = Pick<IOrder, "branchId" | "userId">;

export interface IOrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  quantityAmount: number;
}

export type OrderItemCreate = Pick<IOrderItem, "quantityAmount" | "quantity">;

export interface ICategory {
  id: number;
  categoryName: string;
  // product?:
}

export interface IProduct {
  id: number;
  catergoryId: number;
  productName: string;
  price: number;
  description?: string;
  createdAt: string;
}

export interface IProfit {
  id: number;
  totalExpensesPerDayId: number;
  brachId: number;
  days: number;
  date: string;
  dailySales: number;
  dailyProfit: number;
}

export interface IRawMaterial {
  id: number;
  materialName: string;
  quantityInUnitPerItem: number;
}

export interface IRecipe {
  id: number;
  productId: number;
  rawMaterialId: number;
  quantityInUnitPcsNeeded: number;
}
export interface IRole {
  id: number;
  rolename: string;
}
export interface ITotalExpensesPerDay {
  id: number;
  branchId: number;
  days: number;
  date: string;
  totalExpenses: number;
}
export interface ITransaction {
  id: number;
  orderId: number;
  branchId: number;
  paymentMethod: string;
  amountPaid: number;
}
export interface IUser {
  id: number;
  roleId: number;
  branchId: number;
  firstname: string;
  lastname: string;
  cpNum: string;
  username: string;
  password: string;
}
export interface IBatch {
  id: number;
  inventoryId: number;
  batchQuantity: number;
  expirationDate: string;
  recievedDate: string;
  daysUntilExpiration: number;
  notifWarning: boolean;
  isExpired: boolean;
  isDisposed: boolean;
}
export interface ISystemNotification {
  id: number;
  inventoryId: number;
  notificationDate: string;
  stauts: string;
  isSolved: boolean;
}

export type IBranchCreateBody = Prisma.XOR<
  Prisma.BranchCreateInput,
  Prisma.BranchUncheckedCreateInput
>;
export type IExpenseCreateBody = Prisma.XOR<
  Prisma.ExpenseCreateInput,
  Prisma.ExpenseUncheckedCreateInput
>;
export type IInventoryCreateBody = Prisma.XOR<
  Prisma.InventoryCreateInput,
  Prisma.InventoryUncheckedCreateInput
>;
export type IOrderCreateBody = Prisma.XOR<
  Prisma.OrderCreateInput,
  Prisma.OrderUncheckedCreateInput
>;
export type IOrderItemCreateBody = Prisma.XOR<
  Prisma.OrderItemCreateInput,
  Prisma.OrderItemUncheckedCreateInput
>;
export type ICategoryCreateBody = Prisma.XOR<
  Prisma.CategoryCreateInput,
  Prisma.CategoryUncheckedCreateInput
>;
export type IProductCreateBody = Prisma.XOR<
  Prisma.ProductCreateInput,
  Prisma.ProductUncheckedCreateInput
>;
export type IProfitCreateBody = Prisma.XOR<
  Prisma.ProfitCreateInput,
  Prisma.ProfitUncheckedCreateInput
>;
export type IRawMaterialCreateBody = Prisma.XOR<
  Prisma.RawMaterialCreateInput,
  Prisma.RawMaterialUncheckedCreateInput
>;
export type IRecipeCreateBody = Prisma.XOR<
  Prisma.RecipeCreateInput,
  Prisma.RecipeUncheckedCreateInput
>;
export type IRoleCreateBody = Prisma.XOR<
  Prisma.RoleCreateInput,
  Prisma.RoleUncheckedCreateInput
>;
export type ITotalExpensesPerDayCreateBody = Prisma.XOR<
  Prisma.TotalExpensesPerDayCreateInput,
  Prisma.TotalExpensesPerDayUncheckedCreateInput
>;
export type ITransactionCreateBody = Prisma.XOR<
  Prisma.TransactionCreateInput,
  Prisma.TransactionUncheckedCreateInput
>;
export type IUserCreateBody = Prisma.XOR<
  Prisma.UserCreateInput,
  Prisma.UserUncheckedCreateInput
>;
export type IBatchCreateBody = Prisma.XOR<
  Prisma.BatchCreateInput,
  Prisma.BatchUncheckedCreateInput
>;
export type ISystemNotificationCreateBody = Prisma.XOR<
  Prisma.SystemNotificationCreateInput,
  Prisma.SystemNotificationUncheckedCreateInput
>;

export type IBranchCreateManyBody =
  Prisma.Enumerable<Prisma.BranchCreateManyInput>;
export type IExpenseCreateManyBody =
  Prisma.Enumerable<Prisma.ExpenseCreateManyInput>;
export type IInventoryCreateManyBody =
  Prisma.Enumerable<Prisma.InventoryCreateManyInput>;
export type IOrderCreateManyBody =
  Prisma.Enumerable<Prisma.OrderCreateManyInput>;
export type IOrderItemCreateManyBody =
  Prisma.Enumerable<Prisma.OrderItemCreateManyInput>;
export type ICategoryCreateManyBody =
  Prisma.Enumerable<Prisma.CategoryCreateManyInput>;
export type IProductCreateManyBody =
  Prisma.Enumerable<Prisma.ProductCreateManyInput>;
export type IProfitCreateManyBody =
  Prisma.Enumerable<Prisma.ProfitCreateManyInput>;
export type IRawMaterialCreateManyBody =
  Prisma.Enumerable<Prisma.RawMaterialCreateManyInput>;
export type IRecipeCreateManyBody =
  Prisma.Enumerable<Prisma.RecipeCreateManyInput>;
export type IRoleCreateManyBody = Prisma.Enumerable<Prisma.RoleCreateManyInput>;
export type ITotalExpensesPerDayCreateManyBody =
  Prisma.Enumerable<Prisma.TotalExpensesPerDayCreateManyInput>;
export type ITransactionCreateManyBody =
  Prisma.Enumerable<Prisma.TransactionCreateManyInput>;
export type IUserCreateManyBody = Prisma.Enumerable<Prisma.UserCreateManyInput>;
export type IBatchCreateManyBody =
  Prisma.Enumerable<Prisma.BatchCreateManyInput>;
export type ISystemNotificationCreateManyBody =
  Prisma.Enumerable<Prisma.SystemNotificationCreateManyInput>;
