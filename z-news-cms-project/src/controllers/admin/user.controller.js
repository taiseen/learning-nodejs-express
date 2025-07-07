import CategoryModel from "../../models/category.model.js";
import SettingModel from "../../models/setting.model.js";
import createError from "../../utils/createError.js";
import NewsModel from "../../models/news.model.js";
import UserModel from "../../models/user.model.js";
import config from "../../config/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';



const loginPage = (_, res) => {
    res.render('admin/login', { layout: false });
}



const adminLogin = async (req, res, next) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required.' })
    };

    try {

        const user = await UserModel.findOne({ username });
        if (!user) {
            return next(createError(401, 'Invalid username & password.'));
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return next(createError(401, 'Invalid username & password.'));
        }

        const { _id: id, role, fullname } = user;

        const token = jwt.sign(
            { id, role, fullname }, // jwt data/payload
            config.jwtSecret,
            { expiresIn: config.jwtExpiresIn }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        });

        res.redirect('/admin/dashboard');

    } catch (error) {
        next(error);
    }
}



const logout = (_, res) => {
    res.clearCookie('token');
    res.redirect('/admin/');
}



const dashboardPage = async (req, res, next) => {

    try {

        const categoryCount = await CategoryModel.countDocuments();
        const userCount = await UserModel.countDocuments();

        // show login user, owen article count number...
        const articleCount = req.role === 'author'
            ? await NewsModel.countDocuments({ author: req.id })
            : await NewsModel.countDocuments();

        res.render('admin/dashboard', {
            fullname: req.fullname,
            role: req.role,
            categoryCount,
            articleCount,
            userCount,
        });

    } catch (error) {
        next(error);
    }
};



const settings = async (req, res, next) => {

    try {

        const settings = await SettingModel.findOne()

        res.render('admin/settings', { role: req.role, settings: settings ?? [] })

    } catch (error) {
        next(error);
    }
};



const saveSettings = async (req, res, next) => {

    const { website_title, footer_description } = req.body;
    const website_logo = req.file?.filename;

    try {

        let setting = await SettingModel.findOne();

        if (!setting) {
            setting = new SettingModel();
        }

        setting.website_title = website_title;
        setting.footer_description = footer_description;


        if (website_logo) {
            if (setting.website_logo) {
                const folderPath = path.join(process.cwd(), 'public', 'uploads');
                const imagePath = path.join(folderPath, article.image);

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            setting.website_logo = website_logo;
        }

        await setting.save();

        res.redirect('/admin/settings');

    } catch (error) {
        next(error);
    }
}



const allUser = async (req, res, next) => {

    try {

        const users = await UserModel.find();

        res.render('admin/users', { users, role: req.role });

    } catch (error) {
        next(error);
    }
}



const addUserPage = (req, res) => {
    // just page render...
    res.render('admin/users/create', { role: req.role });
}



const addUser = async (req, res, next) => {

    try {

        await UserModel.create(req.body);

        res.redirect('/admin/users');

    } catch (error) {
        next(error);
    }
}



const updateUserPage = async (req, res, next) => {

    const id = req.params.id;

    try {

        const user = await UserModel.findById(id);

        if (!user) {
            return next(createError(404, 'User'));
        }

        res.render('admin/users/update', { user, role: req.role });

    } catch (error) {
        next(error);
    }
};



const updateUser = async (req, res, next) => {

    const id = req.params.id;

    const { fullname, role, password } = req.body;

    try {

        const user = await UserModel.findById(id);

        if (!user) {
            return next(createError(404, 'User'));
        }

        user.fullname = fullname || user.fullname;
        user.role = role || user.role;
        if (password) {
            user.password = password;
        }

        await user.save();

        res.redirect('/admin/users');

    } catch (error) {
        next(error);
    }

};



const deleteUser = async (req, res, next) => {

    const id = req.params.id;

    try {

        const user = await UserModel.findByIdAndDelete(id);

        if (!user) {
            return next(createError(404, 'User'));
        }

        res.json({ success: true });

    } catch (error) {
        next(error);
    }
}



// Export all functions as named exports
export {
    updateUserPage,
    dashboardPage,
    saveSettings,
    addUserPage,
    updateUser,
    deleteUser,
    adminLogin,
    loginPage,
    settings,
    addUser,
    allUser,
    logout,
}
