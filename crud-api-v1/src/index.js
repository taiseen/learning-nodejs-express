import studentRoutes from './routes/student.routes.js';
import dbConnection from './config/dbConnection.js';
import express from 'express';


const app = express();


app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/api/students', studentRoutes)


app.use('/', (_, res) => res.send('crud api v1'));


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`📢 Server running :- http://localhost:${PORT}`)
    dbConnection();
});