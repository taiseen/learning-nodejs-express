import express from 'express';
import {
    updateContactPage,
    getAllContacts,
    addContactPage,
    updateContact,
    deleteContact,
    addContact,
    getContact,
} from '../controllers/contact.controller.js';


const router = express.Router();


router.get('/', getAllContacts);

router.get('/add-contact', addContactPage);
router.post('/add-contact', addContact); // its auto run when user submit the form...

router.get('/show-contact/:id', getContact);

router.get('/update-contact/:id', updateContactPage);
router.post('/update-contact/:id', updateContact);

router.get('/delete-contact/:id', deleteContact);


export default router;