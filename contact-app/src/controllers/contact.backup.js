import ContactsDB from '../models/contacts.models.js';
import mongoose from 'mongoose';

// Get all contacts
export const getAllContacts = async (_, res) => {
    try {
        const contacts = await ContactsDB.find();
        res.render('home', { contacts });
    } catch (error) {
        res.status(500).render('500', { message: 'Server Error: Unable to fetch contacts.' });
    }
};

// Render add contact page
export const addContactPage = (_, res) => {
    try {
        res.render('add-contact');
    } catch (error) {
        res.status(500).render('500', { message: 'Error rendering add contact page.' });
    }
};

// Add a contact
export const addContact = async (req, res) => {
    try {
        const formInputData = req.body;

        if (!formInputData || Object.keys(formInputData).length === 0) {
            return res.status(400).render('400', { message: 'Bad Request: No data provided.' });
        }

        await ContactsDB.create(formInputData);
        res.redirect('/');
    } catch (error) {
        res.status(500).render('500', { message: 'Server Error: Unable to add contact.' });
    }
};

// Get a single contact by ID
export const getContact = async (req, res) => {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).render('404', { message: 'Invalid contact ID.' });
    }

    try {
        const contact = await ContactsDB.findById(userId);
        if (!contact) {
            return res.status(404).render('404', { message: 'Contact not found.' });
        }

        res.render('show-contact', { contact });
    } catch (error) {
        res.status(500).render('500', { message: 'Server Error: Unable to retrieve contact.' });
    }
};

// Render update contact page
export const updateContactPage = async (req, res) => {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).render('404', { message: 'Invalid contact ID.' });
    }

    try {
        const contact = await ContactsDB.findById(userId);
        if (!contact) {
            return res.status(404).render('404', { message: 'Contact not found.' });
        }

        res.render('update-contact', { contact });
    } catch (error) {
        res.status(500).render('500', { message: 'Server Error: Unable to load update page.' });
    }
};

// Update a contact
export const updateContact = async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).render('404', { message: 'Invalid contact ID.' });
    }

    try {
        const contact = await ContactsDB.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!contact) {
            return res.status(404).render('404', { message: 'Contact not found to update.' });
        }

        res.redirect('/');
    } catch (error) {
        res.status(500).render('500', { message: 'Server Error: Unable to update contact.' });
    }
};

// Delete a contact
export const deleteContact = async (req, res) => {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).render('404', { message: 'Invalid contact ID.' });
    }

    try {
        const contact = await ContactsDB.findByIdAndDelete(userId);
        if (!contact) {
            return res.status(404).render('404', { message: 'Contact not found to delete.' });
        }

        res.redirect('/');
    } catch (error) {
        res.status(500).render('500', { message: 'Server Error: Unable to delete contact.' });
    }
};
