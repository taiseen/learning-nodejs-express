import studentRoutes from './routes/student.routes.js';
import dbConnection from './config/dbConnection.js';
import express from 'express';
import path from 'path';
import cors from 'cors';
import url from 'url';
import { MulterError } from 'multer';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());


app.use('/api/students', studentRoutes)


app.use('/', (_, res) => res.send('crud api v1'));



app.use((error, req, res, next) => {

    if (error) {
        console.log('🔴 Server Error:', error.message);

        return res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong'
        });
    }

    next();
});



const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`📢 Server running :- http://localhost:${PORT}`)
    dbConnection();
});