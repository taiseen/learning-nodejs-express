import { uploadFields } from './file-upload-rules.js';
import express from 'express';
import multer from 'multer';

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs');



app.get('/', (req, res) => res.render("form-input"));



// app.post('/submitform',upload.array('userfile', 3),(req, res) =>{
//   if(!req.files || req.files.length === 0){
//     return res.status(400).send(`No file uploaded.`)
//   }
//    res.send(req.files)
// })


app.post('/submit-form', uploadFields, (req, res) => {

    console.log(`Files uploaded: `, req.files);
    console.log('✅✅✅✅✅✅✅✅✅✅✅✅✅');

    if (!req.files || req.files.length === 0) {
        return res.status(400).send(`No file uploaded.`)
    }

    return res.send(req.files)
})


// file uploading rules error handling....
app.use((error, req, res, next) => {

    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).send(`Error : Too many files uploaded!`)
        }

        return res.status(400).send(`Multer error: ${error.message} : ${error.code}`);

    } else if (error) {

        return res.status(500).send(`Something went wrong: ${error.message}`);
    }

    next();
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running :- http://localhost:${PORT}`));