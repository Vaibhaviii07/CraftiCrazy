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