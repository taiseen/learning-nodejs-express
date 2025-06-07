import cookieParser from 'cookie-parser';
import express from 'express';


const app = express();

// 📢 app level middleware
// by this in all route we can access this cookie...

// app.use(cookieParser()) // unsigned cookies || usee can modify
app.use(cookieParser('mySecretKey123')) // signed cookies || user can't modify



app.get('/', (req, res) => {

    const home = `Home Page`;

    // const { userName } = req.cookies; // unsigned cookies
    const { userName } = req.signedCookies;

    return !userName
        ? res.send(`${home} : No cookie found`)
        : res.send(`${home} : Cookie found: ${userName}`);
});



app.get('/set', (req, res) => {

    const cookieTime = 1000 * 60 * 15; // 15 minutes

    // ✅✅✅ cookie create + store in user browser...
    res.cookie('userName', 'Taiseen',
        {
            maxAge: cookieTime,
            httpOnly: true, // The cookie only accessible by the web server
            signed: true, // signed cookie system on
            
            // secure: true, // https
            // sameSite: 'strict' // is request come from same server or not
        }
    )
    
    // cookie send with response-header
    res.send(`Cookie has been set ✅`);
});



app.get('/get', (req, res) => {

    // const { userName } = req.cookies; // unsigned cookies
    const { userName } = req.signedCookies;

    return !userName
        ? res.send(`No cookie found`)
        : res.send(`Cookie found: ${userName}`);
});



// 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
app.get('/remove', (req, res) => {
    // delete cookies form user browser by hit this route

    // res.clearCookie('userName');
    res.clearCookie('userName', { signed: true });
    res.send(`Cookie has been deleted`);
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running :- http://localhost:${PORT}`));