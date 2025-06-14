import dbConnection from './connection/dbConnection.js';
import studentRoutes from './routes/student.routes.js';
import userRoutes from './routes/user.routes.js';
import authGard from './middleware/auth.js';
import express from 'express';
import path from 'path';
import cors from 'cors';
import url from 'url';



const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/user', userRoutes);

// app.use();
app.use('/api/students', authGard, studentRoutes);



app.use('/', (_, res) => res.send('crud api v5'));



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