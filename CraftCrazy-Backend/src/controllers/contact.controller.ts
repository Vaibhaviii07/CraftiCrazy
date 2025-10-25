import { Request,Response,NextFunction } from "express";
import * as ContactService from "../services/contact.service";

export const addContact = (req:Request,res:Response,next:NextFunction) => {
    try {
        const {name,email,phone,message} = req.body;

        if(!name || !email || !phone || !message){
            return res.status(400).json({success:false,message:"All required field must be provided."});
        }

        const contact = ContactService.CreateContact({name,email,phone,message});
        res.status(201).json({success:true,message: "Message submitted successfully!",data:contact});

    } catch (error) {
        next(error);
    }
};



export const getContact = async(req:Request,res:Response,next:NextFunction) => {
    try {
        const contacts = await ContactService.getAllContacts();
        res.status(200).json({success:true,data:contacts});
    } catch (error) {
        next(error);
    }
}
