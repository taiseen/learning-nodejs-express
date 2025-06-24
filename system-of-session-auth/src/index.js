import session from 'express-session';
import mongoose from 'mongoose';
import express from 'express';
import {
    renderRegisterPage,
    renderLoginPage,
    getProfile,
    register,
    getHome,
    logout,
    login,
} from './controllers/auth.controllers.js';



const app = express();


//Database Connection
const url = 'mongodb://127.0.0.1/session-auth-system';
mongoose.connect(url)
    .then(() => console.log('✅ Database Connected...'))
    .catch((err) => console.log('❌ Database Connection Failed:', err));



//Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: false
}));



// Middleware to check if user is logged in
// If user is logged in, allow access to the next route
const checkLogin = (req, res, next) => {
    req.session.user
        ? next()
        : res.redirect('login');
}



// Routes
app.get('/', checkLogin, getHome);

app.get('/profile', checkLogin, getProfile);

app.get('/login', renderLoginPage);

app.get('/register', renderRegisterPage);

app.post('/register', register);

app.post('/login', login);

app.get('/logout', logout);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running :- http://localhost:${PORT}`));