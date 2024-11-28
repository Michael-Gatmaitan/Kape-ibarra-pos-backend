import prisma from "../config/db";

interface ICreateInventoryWithNewBatchParams {
  rawMaterialId: string;
  reorderLevel: number;
  batchQuantity: number;
  quantityInUnitPerItem: number;
  expirationDate: string;
}

export const createInventoryWithNewBatch = async (
  params: ICreateInventoryWithNewBatchParams
) => {
  const {
    rawMaterialId,
    quantityInUnitPerItem,
    reorderLevel,
    batchQuantity,
    expirationDate,
  } = params;

  const newInventory = await prisma.inventory.create({
    data: {
      quantityInUnit: quantityInUnitPerItem * batchQuantity,
      reorderLevel,
      stockQuantity: batchQuantity,
      rawMaterialId,
      isReorderNeeded: false,
    },
  });

  console.log("New inventory created: ", newInventory);

  const newBatch = await prisma.batch.create({
    data: {
      inventoryId: newInventory.id,
      rawMaterialId,
      batchQuantity,
      expirationDate,
    },
  });

  console.log("New batch created: ", newBatch);
};
