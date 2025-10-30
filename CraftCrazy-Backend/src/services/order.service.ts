import { Order,IOrderDocument } from "../models/orderModel";
import RazorPay from "razorpay";
import dotenv from "dotenv";

dotenv.config();


const razorpay = new RazorPay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_SECRET_KEY,
});

export const createOrderService = async (orderData:IOrderDocument) => {
    //save data to db first
    const order = new Order(orderData);
    await order.save();

    if(order.paymentMethod === "UPI"){

        const razorpayOrder = await razorpay.orders.create({
            amount:order.totalAmount * 100,
            currency:"INR",
            receipt: order._id.toString(),
            payment_capture: true,
        });

        order.razorPayOrderId = razorpayOrder.id;
        await order.save();

        return {orderDBId: order._id, orderId: razorpayOrder.id};
    }

    return {orderDBId: order._id};
}


export const completeOrderService = async(orderDBId:string, paymentId:string) => {
    const order = await Order.findById(orderDBId);
    if(!order) throw new Error("Order Not Found");

    order.razorpayPaymentId = paymentId;
    await order.save();
    return order;
}