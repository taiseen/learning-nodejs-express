import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });


const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    dbURL: process.env.MONGODB_URI,
};


export default config;