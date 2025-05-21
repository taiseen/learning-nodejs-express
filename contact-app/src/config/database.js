import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const ConnectDB = async () => {

    const dbUrl = process.env.MONGODB_URI;

    try {
        await mongoose.connect(dbUrl);
        console.log('MongoDB Connected ✅');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the application if connection fails
    }
};

export default ConnectDB;