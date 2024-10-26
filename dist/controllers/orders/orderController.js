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
exports.deleteOrder = exports.updateOrder = exports.readOrder = exports.createOrder = void 0;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("create order");
    // res.json({ here: "ASDASD" });
    res.json({ asdas: "ASDASDssss" });
    // res.status(20).json("create order");
});
exports.createOrder = createOrder;
const readOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("read order");
    res.json({ ASD: "ASDASD" });
});
exports.readOrder = readOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("update order");
    // res.status(20).json("update order");
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("delete order");
    // res.status(20).json("delete order");
});
exports.deleteOrder = deleteOrder;
