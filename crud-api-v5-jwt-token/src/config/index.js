import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });


const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    dbURL: process.env.MONGODB_URI,

    token: {
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN,

        // refSecret: process.env.REFRESH_JWT_SECRET,
        // refExpiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    },
};


export default config;