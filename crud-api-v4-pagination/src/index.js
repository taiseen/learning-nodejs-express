import studentRoutes from './routes/student.routes.js';
import dbConnection from './config/dbConnection.js';
import express from 'express';
import path from 'path';
import cors from 'cors';
import url from 'url';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());


app.use('/api/students', studentRoutes)


app.use('/', (_, res) => res.send('crud api v1'));


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`📢 Server running :- http://localhost:${PORT}`)
    dbConnection();
});