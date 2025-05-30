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


const contactRouter = express.Router();

contactRouter.use((req, res, next) => {
    const url = req.url;
    const method = req.method;

    console.log({ url });
    console.log({ method });

    console.log('🚦- Router Level Middleware for - contact routes');
    next();
});

contactRouter.get('/', getAllContacts);

contactRouter.get('/add-contact', addContactPage);
contactRouter.post('/add-contact', addContact); // its auto run when user submit the form...

contactRouter.get('/show-contact/:id', getContact);

contactRouter.get('/update-contact/:id', updateContactPage);
contactRouter.post('/update-contact/:id', updateContact);

contactRouter.get('/delete-contact/:id', deleteContact);


export default contactRouter;