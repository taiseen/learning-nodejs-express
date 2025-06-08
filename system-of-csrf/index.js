import cookieParser from 'cookie-parser';
import express from 'express';
import csrf from 'csurf';

const app = express();


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cookieParser())


const csrfProtection = csrf({ cookie: true })


app.get('/', (_, res) => res.send(`
<div>
    <h1>CSRF</h1>
    <h2>Cross-site request forgery (also known as CSRF) is a web security vulnerability 
    that allows an attacker to induce users to perform actions 
    that they do not intend to perform. </h2>
    
    <a href="/input" >Input Link</a>
</div>
`));



app.get('/input', csrfProtection, (req, res) => {
    res.render("form-input", { csrfToken: req.csrfToken() })
});



app.post('/submit-data', csrfProtection, (req, res) => {
    res.send(req.body)
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running :- http://localhost:${PORT}`));