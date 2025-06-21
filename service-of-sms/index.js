import { sendSms } from './controller/sendSms.js';
import express from 'express';


const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');


app.post('/send-sms', sendSms);


app.get('/', (_, res) => res.render('SmsPage'));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running :- http://localhost:${PORT}`));