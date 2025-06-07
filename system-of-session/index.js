import expressSession from 'express-session';
// import mongoStore from 'connect-mongo';
import express from 'express';


const app = express();


app.use(expressSession({
    secret: 'secretPassword',
    resave: false,
    saveUninitialized: false,
    // store session in MongoDB...
    // store: mongoStore.create({
    //     mongoUrl: 'mongodb://127.0.0.1:27017/sessionDb',
    //     collectionName: 'mySessions'
    // }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))



app.get('/', (req, res) => {

    req.session.userName
        ? res.send(`<h1>Username from session is : ${req.session.userName}</h1>`)
        : res.send('<h1>No username found in session.</h1>');
});



app.get('/set', (req, res) => {

    // ✅✅✅ session created here...
    // & session is temporary data that stored in memory. 
    // if server restart then session will be lost.
    // so we need to store session in database.
    // by this session we can track/check user in other routes...
    req.session.userName = "Taiseen"; // you can set any value here.

    res.send('<h1>Username has been set in session.</h1>');
});



app.get('/get', (req, res) => {

    req.session.userName
        ? res.send(`<h1>Username from session is : ${req.session.userName}</h1>`)
        : res.send('<h1>No username found in session.</h1>');
});



app.get('/about', (req, res) => {

    req.session.userName
        ? res.send(`<h1>Username from session is : ${req.session.userName}</h1>`)
        : res.send('<h1>No username found in session.</h1>');
});



app.get('/destroy', (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            res.status(500).send('Failed to destroy session... ' + err.message);
        }

        res.send('<h1>Session destroy successfully.</h1>');
    })
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running :- http://localhost:${PORT}`));