"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../config/db"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auditLogs = yield db_1.default.auditLog.findMany({
            include: {
                Employee: true,
                Customer: true,
            },
        });
        res.json(auditLogs);
    }
    catch (err) {
        res
            .json({ message: `There was an error getting all audit logs: ${err}` })
            .status(401);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const roleName = req.body.roleName;
    try {
        const newAuditLog = yield db_1.default.auditLog.create({
            data: roleName === "customer"
                ? {
                    customerId: id,
                }
                : {
                    employeeId: id,
                },
        });
        res.json(newAuditLog);
    }
    catch (err) {
        res
            .json({ message: `There was an error creating audit log: ${err}` })
            .status(401);
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const roleName = req.body;
    try {
        const lastAuditLog = yield db_1.default.auditLog.findFirst({
            where: roleName === "customer"
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
        const updatedAuditLog = yield db_1.default.auditLog.update({
            where: { id: lastAuditLog.id },
            data: {
                timeOut: new Date(),
            },
        });
        console.log("Updated audit log: ", updatedAuditLog);
        res.json(updatedAuditLog);
    }
    catch (err) {
        res
            .json({ message: `There was an error updating audit log: ${err}` })
            .status(401);
    }
}));
exports.default = router;
