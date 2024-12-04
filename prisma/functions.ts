import prisma from "../config/db";

export async function setupFunctions() {
  try {
    await prisma.$queryRaw`
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

    await prisma.$queryRaw`
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

    await prisma.$queryRaw`
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

    await prisma.$queryRaw`
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
    await prisma.$queryRaw`
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
  } catch (error) {
    console.error("Error setting up trigger:", error);
  } finally {
    await prisma.$disconnect();
  }
}
