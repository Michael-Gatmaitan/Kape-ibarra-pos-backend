"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// if (process.env.NODE_ENV === 'development') {
//   const g: typeof global = global.prisma;
//   if (!g) {
//   }
// }
exports.default = prisma;
