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

export interface ICustomer {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string | null;
  gender: string;
  phoneNumber: string | null;
  createdAt: Date;
}

export interface IInventory {
  id: string;
  rawMaterialId: string;
  quantityInUnit: number;
  stockQuantity: number;
  isReorderNeeded: boolean;
}

export interface IOrder {
  id: string;
  orderedAt: string;
  customerId: string;
  customerNumber: number;
  totalPrice: number;
  proofOfPaymentImg?: string;
  orderType: "walk-in" | "online";
  orderStatus: "preparing" | "payment pending" | "ready to pickup" | "rejected";
  employeeId: string;
  baristaId?: string;
}

export interface IOrderItem {
  id: string;
  orderId: string;
  productId: string;
  recordedProductPrice: number;
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
  isAvailable: boolean;
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
  days: number;
  date: string;
  totalExpenses: number;
}
export interface ITransaction {
  id: string;
  orderId: string;
  paymentMethod: string;
  totalAmount: number;
  totalTendered: number;
  change: number;
  vatAmount?: number;
  vatableSales: number;
  transactionDate: string;
}
export interface IEmployee {
  id: string;
  roleId: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  username: string;
  password: string;
  createdAt: Date;
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

export interface IAuditLog {
  id: string;
  customerId?: string;
  employeeId?: string;
  timeIn: Date;
  timeOut: Date;
}

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
