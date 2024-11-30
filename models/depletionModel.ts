import { Prisma } from "@prisma/client";
import prisma from "../config/db";

export const deductInventory = async (
  orderItems: Prisma.OrderItemCreateManyInput[]
) => {
  // console.log("Depletionsssss: ", orderItems);
  orderItems.forEach((orderItem) => {
    handleDeduction(orderItem.productId, orderItem.quantity);
  });
};

const handleDeduction = async (productId: string, quantity: number) => {
  const recipes = await prisma.recipe.findMany({
    where: {
      productId,
    },
  });

  recipes.forEach(async (recipe) => {
    const quantityToDeduct = recipe.quantityInUnitPcsNeeded * quantity;
    console.log(
      `${quantityToDeduct} * ${quantity} = ${quantityToDeduct * quantity}`
    );

    console.log(recipe.rawMaterialId);

    const rawMaterial = await prisma.rawMaterial.findFirst({
      where: { id: recipe.rawMaterialId },
    });

    const inv = await prisma.inventory.findFirst({
      where: {
        rawMaterialId: recipe.rawMaterialId,
      },
    });

    if (!inv || !rawMaterial) return;

    const updatedStockQuantity = Math.floor(
      inv.quantityInUnit / rawMaterial.quantityInUnitPerItem
    );

    if (updatedStockQuantity < inv.reorderLevel) {
    }

    const updated = await prisma.inventory.update({
      where: { id: inv.id },
      data: {
        quantityInUnit: {
          decrement: quantityToDeduct,
        },
        stockQuantity: updatedStockQuantity,
        isReorderNeeded: updatedStockQuantity < inv.reorderLevel,
      },
    });

    console.log(updated, quantityToDeduct);
  });
};
