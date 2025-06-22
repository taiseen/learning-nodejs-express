import { getCookie, home, removeCookie, setCookie } from './controllers.js';
import cookieParser from 'cookie-parser';
import express from 'express';


const app = express();

// 📢 app level middleware
// by this in all route we can access this cookie...

// app.use(cookieParser()) // unsigned cookies || usee can modify
app.use(cookieParser('mySecretKey123')) // signed cookies || user can't modify



app.get('/', home);

app.get('/set', setCookie);

app.get('/get', getCookie);

app.get('/remove', removeCookie);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running :- http://localhost:${PORT}`));