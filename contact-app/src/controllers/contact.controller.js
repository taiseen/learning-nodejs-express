import { asyncHandler, isValidObjectId, renderError } from '../helper/index.js';
import ContactsDB from '../models/contacts.models.js';


// Get all contacts
export const getAllContacts = asyncHandler(async (req, res) => {
    // const contacts = await ContactsDB.find();
    // return res.render('home', { contacts });

    const { page = 1, limit = 5 } = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    const result = await ContactsDB.paginate({}, options);

    return res.render('home', {
        totalDocs: result.totalDocs,
        limit: result.limit,
        totalPages: result.totalPages,
        currentPage: result.page,
        counter: result.pagingCounter,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        contacts: result.docs, // data 
    });

});


// Render add contact page
export const addContactPage = (_, res) => res.render('add-contact');


// Add a contact
export const addContact = asyncHandler(async (req, res) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0)
        return renderError(res, 400, '400', 'No data provided.');

    await ContactsDB.create(data);
    return res.redirect('/');
});


// Get a single contact
export const getContact = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId(id)) return renderError(res, 404, '404', 'Invalid contact ID.');

    const contact = await ContactsDB.findById(id);
    if (!contact) return renderError(res, 404, '404', 'Contact not found.');

    return res.render('show-contact', { contact });
});


// Render update contact page
export const updateContactPage = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId(id)) return renderError(res, 404, '404', 'Invalid contact ID.');

    const contact = await ContactsDB.findById(id);
    if (!contact) return renderError(res, 404, '404', 'Contact not found.');

    return res.render('update-contact', { contact });
});


// Update a contact
export const updateContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    if (!isValidObjectId(id)) return renderError(res, 404, '404', 'Invalid contact ID.');

    const contact = await ContactsDB.findByIdAndUpdate(id, updatedData, { new: true });
    if (!contact) return renderError(res, 404, '404', 'Contact not found for update.');

    return res.redirect('/');
});


// Delete a contact
export const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId(id)) return renderError(res, 404, '404', 'Invalid contact ID.');

    const contact = await ContactsDB.findByIdAndDelete(id);
    if (!contact) return renderError(res, 404, '404', 'Contact not found to delete.');

    return res.redirect('/');
});
