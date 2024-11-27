-- CreateTable
CREATE TABLE "EWallet" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "phoneNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EWallet_pkey" PRIMARY KEY ("id")
);
