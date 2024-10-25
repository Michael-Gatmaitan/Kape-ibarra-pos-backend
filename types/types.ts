export interface IBranch {
  id: number;
  streetAddress: string;
  baranggay: string;
  city: string;
  zipCode: number;
}

export interface ICustomer {
  id: number;
  username: string;
  customerNumber: number;
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
  customerId: number;
  userId: number;
  totalPrice: number;
  orderStatus: boolean;
}

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
