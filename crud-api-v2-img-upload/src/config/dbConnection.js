import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = async () => {

    try {
        const dbUrl = process.env.MONGODB_URL;

        await mongoose.connect(dbUrl);

        console.log('✅ MongoDB Connected');

    } catch (error) {
        console.error('🔴 MongoDB connection failed:', error);
        process.exit(1); // Exit the application if connection fails
    }
}


export default dbConnection;