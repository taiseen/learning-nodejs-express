import ContactsDB from './models/contacts.models.js';
import mongoose from 'mongoose';
import express from 'express';

const app = express();

mongoose.connect('mongodb://localhost:27017/contact-crud-app')
    .then(() => console.log('MongoDB connected'));


// Middlewares...
app.use(express.urlencoded({ extended: false })); // for process html form input data (req.body)
app.use(express.static('public')); // static files
app.use(express.json()); // for process json data form binary stream
app.set('view engine', 'ejs'); // template engine 



// Routes
app.get('/', async (_, res) => {
    const contacts = await ContactsDB.find() // find all contacts from DB
    res.render('home', { contacts });
})


app.get('/add-contact', (_, res) => { res.render('add-contact') })


// its auto run when user submit the form...
app.post('/add-contact', async (req, res) => {
    const formInputData = req.body;
    await ContactsDB.create(formInputData); // mongoose method
    res.redirect('/');
})


app.get('/show-contact/:id', async (req, res) => {
    const userId = req.params.id;
    const contact = await ContactsDB.findById(userId); // mongoose method
    res.render('show-contact', { contact });
})


app.get('/update-contact/:id', async (req, res) => {
    const userId = req.params.id;
    const contact = await ContactsDB.findById(userId);
    res.render('update-contact', { contact })
})


app.post('/update-contact/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    await ContactsDB.findByIdAndUpdate(userId, updatedData);
    res.redirect('/');
})


app.get('/delete-contact/:id', async (req, res) => {
    const userId = req.params.id;
    await ContactsDB.findByIdAndDelete(userId);
    res.redirect('/');
})





const PORT = process.env.PORT || 3000;
const serverListener = () => console.log(`🚀 Server is running on http://localhost:${PORT}`);

app.listen(3000, serverListener);