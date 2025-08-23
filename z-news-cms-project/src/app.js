import frontendRoutes from './routes/frontend.routes.js';
import dbConnection from './connection/dbConnection.js';
import minifyHTML from 'express-minify-html-terser';
import adminRoutes from './routes/admin.routes.js';
import expressLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import express from 'express';
import path from 'path';
import url from 'url';



const app = express();


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middlewares...
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.json({ limit: '10mb' })); // to support JSON-encoded bodies over 10mb
app.use(express.static(path.join(__dirname, '..', 'public'))); // serve static files from the public directory   
app.use(express.urlencoded({ extended: false, limit: '10mb' })); // to support URL-encoded bodies over 10mb

app.use(compression({
    level: 9,
    threshold: 10 * 1024, // compress all responses over 10kb
    filter: (req, res) => {

        if (req.headers['x-no-compression']) {
            // don't compress responses with this request header
            return false;
        }

        // fallback to standard filter function
        return compression.filter(req, res);
    }
}));



// For Improved Performance:-
// View Page Source to see the difference
// This will minify the HTML output for all routes
app.use(minifyHTML({
    override:                       true,
    exception_url:                  false,
    htmlMinifier: {
        removeComments:             true,
        collapseWhitespace:         true,
        collapseBooleanAttributes:  true,
        removeAttributeQuotes:      true,
        removeEmptyAttributes:      true,
        minifyJS:                   true,
    }
}));


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