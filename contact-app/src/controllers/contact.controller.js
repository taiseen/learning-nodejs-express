import ContactsDB from '../models/contacts.models.js';


export const getAllContacts = async (_, res) => {
    const contacts = await ContactsDB.find() // find all contacts from DB
    res.render('home', { contacts });
}


export const addContactPage = (_, res) => { res.render('add-contact') }


export const addContact = async (req, res) => {
    const formInputData = req.body;
    await ContactsDB.create(formInputData); // mongoose method
    res.redirect('/');
}


export const getContact = async (req, res) => {
    const userId = req.params.id;
    const contact = await ContactsDB.findById(userId); // mongoose method
    res.render('show-contact', { contact });
}


export const updateContactPage = async (req, res) => {
    const userId = req.params.id;
    const contact = await ContactsDB.findById(userId);
    res.render('update-contact', { contact })
}


export const updateContact = async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    await ContactsDB.findByIdAndUpdate(userId, updatedData);
    res.redirect('/');
}


export const deleteContact = async (req, res) => {
    const userId = req.params.id;
    await ContactsDB.findByIdAndDelete(userId);
    res.redirect('/');
}