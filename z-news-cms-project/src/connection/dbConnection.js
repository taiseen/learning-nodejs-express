import config from '../config/index.js';
import mongoose from 'mongoose';


const dbConnection = async () => {

    try {
        await mongoose.connect(config.dbURL);

        console.log('✅ MongoDB Connected');

    } catch (error) {
        console.error('🔴 MongoDB connection failed:', error);
        process.exit(1); // Exit the application if connection fails
    }
}


export default dbConnection;