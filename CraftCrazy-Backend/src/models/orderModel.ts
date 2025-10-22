import mongoose, {Document,Schema,Types} from "mongoose";
import { IorderItem, IOrder } from "../types/orderTypes";


export interface IOrderDocument extends IOrder,Document {}

const orderItemSchema = new Schema<IorderItem>({
    productId: {type: String, required:true},
    name: {type:String,required:true},
    price: {type:Number, required:true},
    quantity: {type:Number, required:true},
    customization: {type:String, required:false}
});



export interface IOrderDocument extends IOrder, Document {
  _id: Types.ObjectId;
}

const OrderSchema = new Schema<IOrderDocument>({
    customer: {
        name:{type:String,required:true},
        email:{type:String, required:true},
        contact:{type:String,required:true},
        address:{type:String,required:true},
        apartment:{type:String,required:false},
        city:{type:String,required:true},
        state:{type:String,required:true},
        pincode:{type:String,required:true},
    },

    items:{type: [orderItemSchema], required:true},
    totalAmount: {type:Number,required:true},
    paymentMethod: { type: String, required: true, enum: ["UPI", "CASH", "CARD"] },
    razorPayOrderId:{type:String},
    razorpayPaymentId:{type:String},
    createdAt: {type:Date,default:Date.now}

});


export const Order = mongoose.model<IOrderDocument>("Order", OrderSchema);