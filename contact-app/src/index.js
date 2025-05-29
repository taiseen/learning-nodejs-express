import { globalErrorHandler } from './error/index.js';
import ContactRoutes from './routes/contact.route.js';
import ConnectDB from './config/database.js';
import express from 'express';
import path from 'path';
import url from 'url';

const app = express();

ConnectDB();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Types of Middleware in Express.js
// 1· Built-in            Middleware
// 2· Application-Level   Middleware
// 3· Router-Level        Middleware
// 4· Error-handling      Middleware
// 5· Third-Party         Middleware



// Built-in Middlewares...
app.use(express.urlencoded({ extended: false })); // for process html form input data (req.body)
app.use(express.static('public')); // static files
app.use(express.json()); // convert binary stream data into json data format



app.set('view engine', 'ejs'); // template engine 
app.set('views', path.join(__dirname, 'views'));



// ✅ application level middleware & this will run for all routes
// ✅ This middleware must write/keep before the all routes
app.use((req, res, next) => {
    console.log('✅ - Application Level Middleware for - all routes');
    next();
});



// 🚦 Routes... middleware...
app.use("/", ContactRoutes);



app.use((_, res) => {
    // res.send('<h1>404 - Page Not Found</h1>');

    // ✅ error show by [ejs template] at browser UI
    res.status(404).render('404', { message: '🚫 Page Not Found' });
})



// 🔴 error level middleware
// and this must write/keep after all routes
// and this will run when any error occurs in the application
app.use(globalErrorHandler);



const PORT = process.env.PORT || 8090;
const serverListener = () => {
    console.log(`🚀 Server is run at - http://localhost:${PORT}`);
}

app.listen(PORT, serverListener);