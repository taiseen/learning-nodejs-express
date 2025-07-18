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
app.use(express.json());
app.use(expressLayouts);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));


// View engine setup
app.set('views', path.join(__dirname, 'views'));  // Add this line
app.set('view engine', 'ejs');
app.set('layout', 'layout'); // for frontend layout



app.use('/', frontendRoutes);


app.use('/admin', (req, res, next) => {
    res.locals.layout = 'admin/layout';
    next();
})

app.use('/admin', adminRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    dbConnection();
    console.log(`Server running :- http://localhost:${PORT}`);
});


// You have been signed out
// You’ve been signed out of the AWS console. 
// AWS sessions in all tabs have been signed out.