import { Contact } from "../models/contact.mode";
import { IContact } from "../types/contactTypes";


export const CreateContact = async (data:IContact) => {
    const newContact =  new Contact(data);
    console.log(newContact);
    await newContact.save();
};

export const getAllContacts = async() => {
    return await Contact.find().sort({createdAt:1});
}