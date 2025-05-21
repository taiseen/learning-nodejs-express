import ContactRoutes from './routes/contact.route.js';
import ConnectDB from './config/database.js';
import express from 'express';
import path from 'path';
import url from 'url';

const app = express();

ConnectDB();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares...
app.use(express.urlencoded({ extended: false })); // for process html form input data (req.body)
app.use(express.static('public')); // static files
app.use(express.json()); // for process json data form binary stream
app.set('view engine', 'ejs'); // template engine 
app.set('views', path.join(__dirname, 'views'));


// Routes... middleware...
app.use("/", ContactRoutes);



const PORT = process.env.PORT || 8090;
const serverListener = () => {
    console.log(`🚀 Server is run at - http://localhost:${PORT}`);
}

app.listen(PORT, serverListener);