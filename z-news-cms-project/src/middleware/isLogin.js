import config from '../config/index.js';
import jwt from 'jsonwebtoken';


const isLogIn = async (req, res, next) => {

    try {

        const token = req.cookies.token;
        if (!token) return res.redirect('/admin/');

        const tokenData = jwt.verify(token, config.jwtSecret);

        // now inside every controller 
        // we can access these infos...
        // for authorization purposes...
        req.id = tokenData.id;
        req.role = tokenData.role;
        req.fullname = tokenData.fullname;

        next();

    } catch (error) {
        console.log('isLogIn:- 🔴', error);
        res.status(401).send('Unauthorized: Invalid token');
    }
};


export default isLogIn;