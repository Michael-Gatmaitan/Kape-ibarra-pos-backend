import { Request, Response } from "express";
import prisma from "../../config/db";
import { ICreateRawMaterialBody } from "../../types/types";
import { createInventoryWithNewBatch } from "../../models/inventoryModel";

export const getRawMaterials = async (req: Request, res: Response) => {
  const result = await prisma.rawMaterial.findMany();
  res.json(result);
};

export const getRawMaterialById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const rawMaterial = await prisma.rawMaterial.findFirst({ where: { id } });

    if (!rawMaterial?.id) {
      res.json({ error: `Raw material with ${id} not found` }).status(403);
      return;
    }

    res.json(rawMaterial);
  } catch (err) {
    console.log(err);
    res
      .json({
        error: `Something went wrong getting raw material by id of ${id}`,
      })
      .status(403);
  }
};

// interface ICreateRawMaterialBody

export const createRawMaterial = async (req: Request, res: Response) => {
  // Search for the raw materials first if it is EXISTED
  // if not, create it.

  const body = req.body as ICreateRawMaterialBody & {
    batchQuantity: number;
    reorderLevel: number;
    expirationDate: string;
  };

  body.quantityInUnitPerItem = parseInt(body.quantityInUnitPerItem.toString());
  body.rawPrice = parseInt(body.rawPrice.toString());

  body.batchQuantity = parseInt(body.batchQuantity.toString());
  body.reorderLevel = parseInt(body.reorderLevel.toString());
  // body.batchQuantity
  // body.expirationDate

  const rawMaterialExists = (
    await prisma.rawMaterial.findFirst({
      where: { materialName: body.materialName },
    })
  )?.id;

  if (rawMaterialExists) {
    res.json({ error: "Raw material exists" });
    console.log(rawMaterialExists);
    return;
  }

  // Create raw material
  try {
    const {
      // For creating raw material
      rawPrice,
      materialName,
      quantityInUnitPerItem,

      // For creating inventory and batch
      batchQuantity,
      expirationDate,
      reorderLevel,
    } = body;

    const newRawMaterial = await prisma.rawMaterial.create({
      data: {
        rawPrice,
        materialName,
        quantityInUnitPerItem,
      },
    });

    // Create inventory here

    createInventoryWithNewBatch({
      rawMaterialId: newRawMaterial.id,
      reorderLevel: reorderLevel,
      batchQuantity: batchQuantity,
      quantityInUnitPerItem: newRawMaterial.quantityInUnitPerItem,
      expirationDate: expirationDate,
    });

    res.json(newRawMaterial);
  } catch (error) {
    console.log(error);
    res.json({ error: `Failed to create raw material ${error}` });
  }
};

export const updateRawMaterialById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const rawMaterialBody = req.body;

  rawMaterialBody.rawPrice = parseInt(rawMaterialBody.rawPrice.toString());
  rawMaterialBody.quantityInUnitPerItem = parseInt(
    rawMaterialBody.quantityInUnitPerItem.toString()
  );

  const { materialName, rawPrice, quantityInUnitPerItem } = rawMaterialBody;

  console.log(rawMaterialBody);

  try {
    // Update raw material
    const updatedRawMaterial = await prisma.rawMaterial.update({
      where: { id },
      data: {
        materialName,
        rawPrice,
        quantityInUnitPerItem,
      },
    });

    console.log(updatedRawMaterial);
    res.json(updatedRawMaterial);
  } catch (error) {
    console.log("Something went wrong updating raw material");
    res.json({
      error: `Something went wrong updating raw material with id of ${id}`,
    });
  }
};

export const deleteRawMaterialById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedRawMaterial = await prisma.rawMaterial.delete({ where: { id } });
  console.log(deletedRawMaterial);

  res.json(deletedRawMaterial);
};
