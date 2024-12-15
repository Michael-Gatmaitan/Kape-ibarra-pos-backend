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
exports.setupFunctions = setupFunctions;
const db_1 = __importDefault(require("../config/db"));
function setupFunctions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.default.$queryRaw `
    CREATE OR REPLACE FUNCTION calculate_order_amount(order_id UUID) 
    RETURNS FLOAT AS $$
    DECLARE
      total_amount FLOAT := 0;
    BEGIN
      SELECT SUM(oi."quantityAmount")
      INTO total_amount
      FROM "OrderItem" oi
      WHERE oi."orderId" = order_id;
      RETURN total_amount;
    END;
    $$ LANGUAGE plpgsql;
  `;
            yield db_1.default.$queryRaw `
    CREATE OR REPLACE FUNCTION get_order_status(order_id UUID)
    RETURNS TEXT AS $$
    DECLARE
      status TEXT;
    BEGIN
      SELECT "orderStatus"
      INTO status
      FROM "Order"
      WHERE id = order_id;
      RETURN status;
    END;
    $$ LANGUAGE plpgsql;
  `;
            yield db_1.default.$queryRaw `
    CREATE OR REPLACE FUNCTION get_customer_order_count(customer_id UUID)
    RETURNS INT AS $$
    DECLARE
      order_count INT;
    BEGIN
      SELECT COUNT(*)
      INTO order_count
      FROM "Order"
      WHERE "customerId" = customer_id;
      RETURN order_count;
    END;
    $$ LANGUAGE plpgsql;
  `;
            yield db_1.default.$queryRaw `
    CREATE OR REPLACE FUNCTION get_employee_order_count(employee_id UUID)
    RETURNS INT AS $$
    DECLARE
      order_count INT;
    BEGIN
      SELECT COUNT(*)
      INTO order_count
      FROM "Order"
      WHERE "employeeId" = employee_id;
      RETURN order_count;
    END;
    $$ LANGUAGE plpgsql;
  `;
            yield db_1.default.$queryRaw `
    CREATE OR REPLACE FUNCTION get_inventory_reorder_status(inventory_id UUID)
    RETURNS BOOLEAN AS $$
    DECLARE
      reorder_needed BOOLEAN;
    BEGIN
      SELECT "isReorderNeeded"
      INTO reorder_needed
      FROM "Inventory"
      WHERE id = inventory_id;
      RETURN reorder_needed;
    END;
    $$ LANGUAGE plpgsql;
  `;
            console.log("Function created successfully!");
        }
        catch (error) {
            console.error("Error setting up trigger:", error);
        }
        finally {
            yield db_1.default.$disconnect();
        }
    });
}
