"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderUpdate = exports.getAllOrders = exports.completeOrderService = exports.createOrderService = void 0;
const orderModel_1 = require("../models/orderModel");
const razorpay_1 = __importDefault(require("razorpay"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});
const createOrderService = async (orderData) => {
    //save data to db first
    const order = new orderModel_1.Order(orderData);
    await order.save();
    if (order.paymentMethod === "UPI") {
        const razorpayOrder = await razorpay.orders.create({
            amount: order.totalAmount * 100,
            currency: "INR",
            receipt: order._id.toString(),
            payment_capture: true,
        });
        order.razorPayOrderId = razorpayOrder.id;
        await order.save();
        return { orderDBId: order._id, orderId: razorpayOrder.id };
    }
    return { orderDBId: order._id };
};
exports.createOrderService = createOrderService;
const completeOrderService = async (orderDBId, paymentId) => {
    const order = await orderModel_1.Order.findById(orderDBId);
    if (!order)
        throw new Error("Order Not Found");
    order.razorpayPaymentId = paymentId;
    order.transactionStatus = "Payment Succeed";
    order.orderStatus = "Processing";
    await order.save();
    return order;
};
exports.completeOrderService = completeOrderService;
const getAllOrders = async () => {
    return await orderModel_1.Order.find().sort({ createdAt: -1 });
};
exports.getAllOrders = getAllOrders;
const orderUpdate = async (orderId, Status) => {
    const allowedStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];
    if (!allowedStatuses.includes(Status)) {
        throw new Error("invalid order status");
    }
    const order = await orderModel_1.Order.findById(orderId);
    if (!order)
        throw new Error("Order not found");
    order.orderStatus = Status;
    await order.save();
    return order;
};
exports.orderUpdate = orderUpdate;
