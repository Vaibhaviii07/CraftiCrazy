"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getAllOrders = exports.completeOrder = exports.createOrder = void 0;
const orderService = __importStar(require("../services/order.service"));
const createOrder = async (req, res, next) => {
    try {
        const data = await orderService.createOrderService(req.body);
        console.log(data);
        res.status(201).json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.createOrder = createOrder;
const completeOrder = async (req, res, next) => {
    try {
        const { orderDBId, paymentId } = req.body;
        const order = await orderService.completeOrderService(orderDBId, paymentId);
        console.log(order);
        res.json(order);
    }
    catch (error) {
        next(error);
    }
};
exports.completeOrder = completeOrder;
const getAllOrders = (req, res, next) => {
    try {
        const allOrders = orderService.getAllOrders();
        res.status(200).json({ success: true, message: "Orders fetched successfully", data: allOrders });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllOrders = getAllOrders;
const updateOrderStatus = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const updatedOrder = await orderService.orderUpdate(orderId, status);
        res.status(200).json({ message: "Order status updated Successfully", order: updatedOrder });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateOrderStatus = updateOrderStatus;
