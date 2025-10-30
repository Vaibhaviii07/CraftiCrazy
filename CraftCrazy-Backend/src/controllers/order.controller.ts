import { Request,Response,NextFunction } from "express";
import * as orderService from "../services/order.service";



export const createOrder = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const data = await orderService.createOrderService(req.body);
        console.log(data);
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
}

export const completeOrder = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {orderDBId, paymentId} = req.body;
        const order = await orderService.completeOrderService(orderDBId,paymentId);
        console.log(order);
        res.json(order);
    } catch (error) {
        next(error);
    }
}

export const getAllOrders = (req:Request,res:Response,next:NextFunction) => {
    try {
        const allOrders = orderService.getAllOrders();
        res.status(200).json({success:true,message:"Orders fetched successfully", data:allOrders});
    } catch (error) {   
        next(error);
    }
}

export const updateOrderStatus = async(req:Request,res:Response,next:NextFunction) => {
    try {
        const {orderId} = req.params;
        const {status} = req.body;

        const updatedOrder = await orderService.orderUpdate(orderId,status);

        res.status(200).json({message:"Order status updated Successfully",order:updatedOrder});
    } catch (error:any) {
        res.status(400).json({message: error.message});
    }
}

