"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const accesscontrol_1 = require("accesscontrol");
const ac = new accesscontrol_1.AccessControl();
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
