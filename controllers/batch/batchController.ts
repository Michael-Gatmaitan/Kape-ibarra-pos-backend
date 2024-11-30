import { Request, Response } from "express";
import prisma from "../../config/db";

interface ICreateBatchBody {
  rawMaterialId: string;
  batchQuantity: number;
  expirationDate: string;
}
// import prisma from "../../config/db";

// const router = express.Router();

export const createBatch = async (req: Request, res: Response) => {
  const body: ICreateBatchBody = req.body;
  body.batchQuantity = parseInt(body.batchQuantity.toString());

  const { rawMaterialId, batchQuantity, expirationDate } = body;
  try {
    const rawMaterial = await prisma.rawMaterial.findUnique({
      where: { id: rawMaterialId },
    });

    if (!rawMaterial) {
      res
        .json({ message: `Cannot find raw material of id ${rawMaterialId}` })
        .status(401);
      return;
    }

    const inventory = await prisma.inventory.findFirst({
      where: { rawMaterialId: rawMaterial.id },
    });

    if (!inventory) {
      res
        .json({
          message: `Cannot find inventory using rawMaterialId of ${rawMaterialId}`,
        })
        .status(401);
      return;
    }

    const inventoryStockQuantity = inventory.stockQuantity + batchQuantity;
    const inventoryQuantityUnit =
      inventory.quantityInUnit +
      rawMaterial.quantityInUnitPerItem * batchQuantity;

    const inventoryIsReorderNeeded =
      inventoryStockQuantity < inventory.reorderLevel;

    // update here
    const updatedInventory = await prisma.inventory.update({
      where: { id: inventory.id },
      data: {
        stockQuantity: inventoryStockQuantity,
        quantityInUnit: inventoryQuantityUnit,
        isReorderNeeded: inventoryIsReorderNeeded,

        batches: {
          create: {
            rawMaterialId: rawMaterial.id,
            batchQuantity,
            expirationDate,
          },
        },
      },
    });

    res.json({ updatedInventory });
  } catch (err) {
    res
      .json({ message: `There was an error updating inventory ${err}` })
      .status(401);
  }
};

export const getAllBatch = async (req: Request, res: Response) => {
  try {
    const batches = await prisma.batch.findMany();
    res.json(batches);
  } catch (err) {
    res
      .json({ message: `There was an error getting all batches: ${err}` })
      .status(401);
  }
};
