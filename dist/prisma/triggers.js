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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTrigger = setupTrigger;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function setupTrigger() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create the trigger function
            yield prisma.$queryRaw `
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
            yield prisma.$queryRaw `
        CREATE OR REPLACE TRIGGER trigger_update_daily_sales
        AFTER INSERT ON "Transaction"
        FOR EACH ROW
        EXECUTE FUNCTION update_daily_sales();
        `;
            console.log("Trigger and function created successfully!");
        }
        catch (error) {
            console.error("Error setting up trigger:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
