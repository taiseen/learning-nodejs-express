import UserModel from "../models/user.model.js";
import config from "../config/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';



export const registration = async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' })
    };


    try {

        const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists.' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await UserModel({ username, email, password: hashedPassword });

        const savedUser = await newUser.save();

        const userData = {
            username: savedUser.username,
            email: savedUser.email
        }

        res.status(201).json(userData);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};




export const login = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required.' })
    };


    try {

        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password.' });
        }

        // ✅✅✅ token creation...
        const token = jwt.sign(
            { userId: user._id },
            config.token.jwtSecret,
            { expiresIn: config.token.jwtExpiresIn },
        );

        res.status(200).json({ token });

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};




export const logout = async (req, res) => {
    res.json({ message: 'Logged out successfully.' });
};