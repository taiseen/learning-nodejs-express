import sendEmail from './controller/sendEmail.js';
import express from 'express';


const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');



app.post('/send-email', sendEmail);

app.get('/', (_, res) => res.render('mailPage'));



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`📢 Server running :- http://localhost:${PORT}`);
});