import expressSession from 'express-session';
// import mongoStore from 'connect-mongo';
import express from 'express';
import {
    getSessionAboutPage,
    getSessionGetPage,
    destroySession,
    getUserName,
    setSession
} from './controllers';


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


app.get('/', getUserName);

app.get('/set', setSession);

app.get('/get', getSessionGetPage);

app.get('/about', getSessionAboutPage);

app.get('/destroy', destroySession);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running :- http://localhost:${PORT}`));