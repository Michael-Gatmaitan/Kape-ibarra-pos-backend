import express, { Router, Request, Response } from "express";
import prisma from "../config/db";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const auditLogs = await prisma.auditLog.findMany({
      include: {
        Employee: true,
        Customer: true,
      },
    });
    res.json(auditLogs);
  } catch (err) {
    res
      .json({ message: `There was an error getting all audit logs: ${err}` })
      .status(401);
  }
});

router.post("/", async (req: Request, res: Response) => {
  const id = req.body.id as string;
  const roleName = req.body.roleName as string;

  try {
    const newAuditLog = await prisma.auditLog.create({
      data:
        roleName === "customer"
          ? {
              customerId: id,
            }
          : {
              employeeId: id,
            },
    });
    res.json(newAuditLog);
  } catch (err) {
    res
      .json({ message: `There was an error creating audit log: ${err}` })
      .status(401);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const roleName = req.body as string;

  try {
    const lastAuditLog = await prisma.auditLog.findFirst({
      where:
        roleName === "customer"
          ? {
              customerId: id,
            }
          : {
              employeeId: id,
            },
      orderBy: {
        timeIn: "desc",
      },
      take: 1,
    });

    if (!lastAuditLog) {
      res.json({ error: `Cannot last audit log of user ${id}` }).status(401);
      return;
    }

    const updatedAuditLog = await prisma.auditLog.update({
      where: { id: lastAuditLog.id },
      data: {
        timeOut: new Date(),
      },
    });

    console.log("Updated audit log: ", updatedAuditLog);

    res.json(updatedAuditLog);
  } catch (err) {
    res
      .json({ message: `There was an error updating audit log: ${err}` })
      .status(401);
  }
});

export default router;
