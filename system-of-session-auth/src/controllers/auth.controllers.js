import UserModel from '../model/user.model.js';
import bcrypt from 'bcryptjs';


export const getHome = (req, res) => {
    res.send(`<h1>Home Page</h1> 
    <p>Hello, ${req.session.user}</p>
    <a href="/logout">Logout</a>
    `);
}



export const getProfile = (req, res) => {
    res.send(`<h1>Profile Page</h1>
    <p>Hello, ${req.session.user}</p>
    <a href="/logout">Logout</a>
    `);
}



export const renderLoginPage = (req, res) => {

    req.session.user
        ? res.redirect('/')
        : res.render('login', { error: null });
}



export const login = async (req, res) => {

    const { userName, userPassword } = req.body

    const user = await UserModel.findOne({ userName });
    if (!user) return res.render('login', { error: 'User not found' });

    const isMatch = await bcrypt.compare(userPassword, user.userPassword);
    if (!isMatch) return res.render('login', { error: 'Invalid Password' });

    req.session.user = userName;

    res.redirect('/');
}



export const renderRegisterPage = (req, res) => {
    res.render('register', { error: null });
}



export const register = async (req, res) => {

    const { userName, userPassword } = req.body

    const hashedPassword = await bcrypt.hash(userPassword, 10)

    // res.send({userName, userPassword: hashedPassword })    

    await UserModel.create({ userName, userPassword: hashedPassword })

    res.redirect('/login');
}



export const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}