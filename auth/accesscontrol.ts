import { AccessControl } from "accesscontrol";
const ac = new AccessControl();

ac.grant("barista")
  .readAny("orders")
  .updateAny("orders")

  // cashier inherits barista
  .extend("cashier")
  .createAny("orders")
  .deleteAny("orders")
  .readAny("transaction")
  .createAny("transaction")

  // admin inherts cashier and now can create acc for emp
  .extend("admin")
  .createAny("emp_account")

  // sys_admin inherits admin and now can create any kind of account
  .extend("sys_admin")
  .createAny("account");
