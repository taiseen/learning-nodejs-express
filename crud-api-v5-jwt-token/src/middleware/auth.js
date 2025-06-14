import config from "../config/index.js";
import jwt from "jsonwebtoken";


const auth = async (req, res, next) => {

    try {

        const bearerHeader = req.headers['authorization'];

        const token = bearerHeader.split(' ')[1];


        if (typeof bearerHeader === 'undefined' || token === 'null') {

            res.status(401).json({ message: 'No token provided' });

        } else {

            const user = jwt.verify(token, config.token.jwtSecret);

            req.token = user;

            next();
        }

    } catch (err) {

        res.status(403).json({ message: 'Invalid or expired token' })
    }
}


export default auth;