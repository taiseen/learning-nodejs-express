
import { registrationValidation } from "./utils/registration-validation.js";
import { validationResult } from "express-validator";
import express from 'express';


const app = express();


app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.set('view engine', 'ejs');


app.get('/', (_, res) => res.render('form-input', { errors: 0 }))


app.post('/', registrationValidation, (req, res) => {
    const error = validationResult(req)

    if (error.isEmpty()) {
        res.send(req.body);
    }

    res.render("form-input", { errors: error.array() })

});


const PORT = process.env.PORT || 4000;
const serverListener = () => console.log(`🚀 Server is run at - http://localhost:${PORT}`);
app.listen(PORT, serverListener);