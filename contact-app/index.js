import express from 'express';
const app = express();



app.use(express.urlencoded({ extended: false })); // for process html form data
app.use(express.static('public')); // static files
app.use(express.json()); // for process json data form binary stream
app.set('view engine', 'ejs'); // template engine 



// Routes
app.get('/', (req, res) => {
    res.send("Contact App");
})

app.get('/show-contact', (req, res) => { })

app.get('/add-contact', (req, res) => { })

app.post('/add-contact', (req, res) => { })

app.get('/update-contact', (req, res) => { })

app.post('/update-contact', (req, res) => { })

app.get('/delete-contact', (req, res) => { })





const PORT = process.env.PORT || 3000;
const serverListener = () => console.log(`🚀 Server is running on http://localhost:${PORT}`);
app.listen(3000, serverListener);