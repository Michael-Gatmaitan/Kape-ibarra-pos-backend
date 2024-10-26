import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// if (process.env.NODE_ENV === 'development') {
//   const g: typeof global = global.prisma;
//   if (!g) {

//   }
// }

export default prisma;
