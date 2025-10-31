"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContacts = exports.CreateContact = void 0;
const contact_mode_1 = require("../models/contact.mode");
const CreateContact = async (data) => {
    const newContact = new contact_mode_1.Contact(data);
    console.log(newContact);
    await newContact.save();
};
exports.CreateContact = CreateContact;
const getAllContacts = async () => {
    return await contact_mode_1.Contact.find().sort({ createdAt: 1 });
};
exports.getAllContacts = getAllContacts;
