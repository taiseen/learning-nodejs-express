import frontendRoutes from './routes/frontend.routes.js';
import dbConnection from './connection/dbConnection.js';
import adminRoutes from './routes/admin.routes.js';
import expressLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import url from 'url';

const app = express();


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middlewares...
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));


// View engine setup
app.set('views', path.join(__dirname, 'views'));  // Add this line
app.set('view engine', 'ejs');
app.set('layout', 'layout'); // for frontend layout



app.use('/admin', (req, res, next) => {
    res.locals.layout = 'admin/layout';
    next();
})

app.use('/admin', adminRoutes);

app.use('/', frontendRoutes); // set this route after admin routes to avoid conflicts


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    dbConnection();
    console.log(`Server running :- http://localhost:${PORT}`);
});


// You have been signed out
// You’ve been signed out of the Admin Panel.
// Admin sessions in all tabs have been signed out.