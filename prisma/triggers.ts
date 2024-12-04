import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function setupTrigger() {
  try {
    // Create the trigger function
    await prisma.$queryRaw`
        CREATE OR REPLACE FUNCTION update_daily_sales()
        RETURNS TRIGGER AS $$
        BEGIN
            -- Check if a Sales row exists for today's date
            IF EXISTS (SELECT 1 FROM "Sales" WHERE date = CURRENT_DATE) THEN
                -- Update the existing row
                UPDATE "Sales"
                SET "dailySales" = "dailySales" + NEW."totalAmount"
                WHERE date = CURRENT_DATE;
            ELSE
                -- Insert a new row for today's date
                INSERT INTO "Sales" (id, date, "dailySales")
                VALUES (gen_random_uuid(), CURRENT_DATE, NEW."totalAmount");
            END IF;

            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        `;

    // Create the trigger
    await prisma.$queryRaw`
        CREATE OR REPLACE TRIGGER trigger_update_daily_sales
        AFTER INSERT ON "Transaction"
        FOR EACH ROW
        EXECUTE FUNCTION update_daily_sales();
        `;

    console.log("Trigger and function created successfully!");
  } catch (error) {
    console.error("Error setting up trigger:", error);
  } finally {
    await prisma.$disconnect();
  }
}
