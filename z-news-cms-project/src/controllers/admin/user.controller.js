import { validationResult } from 'express-validator';
import CategoryModel from "../../models/category.model.js";
import CommentModel from '../../models/comment.model.js';
import SettingModel from "../../models/setting.model.js";
import createError from "../../utils/createError.js";
import NewsModel from "../../models/news.model.js";
import UserModel from "../../models/user.model.js";
import config from "../../config/index.js";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';



const loginPage = (_, res) => {
    res.render('admin/login', { layout: false, errors: 0 });
}



const adminLogin = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('admin/login', {
            layout: false,
            errors: errors.array()
        })
    }

    const { username, password } = req.body;

    try {

        const user = await UserModel.findOne({ username });
        if (!user) {
            // return next(createError(401, 'Invalid username & password.'));

            return res.render('admin/login', {
                layout: false,
                errors: [{ msg: 'Invalid username & password.' }],
            });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            // return next(createError(401, 'Invalid username & password.'));
            return res.render('admin/login', {
                layout: false,
                errors: [{ msg: 'Invalid username & password...' }],
            });
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

    // Utility function to convert string ID to ObjectId
    const toObjectId = (id) => new mongoose.Types.ObjectId(id);

    const userId = req.id;
    const userRole = req.role;

    try {
        // Base query conditions based on role
        const roleBaseQuery = userRole === 'author' ? { author: toObjectId(userId) } : {};

        const articleCount = await NewsModel.countDocuments(roleBaseQuery);
        const categoryCount = await CategoryModel.countDocuments();
        const userCount = await UserModel.countDocuments();

        // For comments, we need to handle author filtering differently
        // since comments are linked to articles, not directly to authors
        let commentCount;
        let commentStatusCounts;

        if (userRole === 'author') {
            // For authors, get comments on their articles only
            const authorArticles = await NewsModel.find({ author: toObjectId(userId) }).select('_id');
            const articleIds = authorArticles.map(article => article._id);

            commentCount = await CommentModel.countDocuments({
                article: { $in: articleIds }
            });

            // Get comment status counts for author's articles
            commentStatusCounts = await CommentModel.aggregate([
                {
                    $match: { article: { $in: articleIds } }
                },
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 }
                    }
                }
            ]);
        } else {
            // For admins, get all comments
            commentCount = await CommentModel.countDocuments();

            commentStatusCounts = await CommentModel.aggregate([
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 }
                    }
                }
            ]);
        }

        // Get category-wise article counts with proper filtering
        let categoryStatsForChart = [];

        if (articleCount > 0) {
            // Attempt aggregation
            try {
                categoryStatsForChart = await NewsModel.aggregate([
                    {
                        $match: roleBaseQuery
                    },
                    {
                        $group: {
                            _id: "$category",
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $lookup: {
                            from: "categories",
                            localField: "_id",
                            foreignField: "_id",
                            as: "categoryInfo"
                        }
                    },
                    {
                        $unwind: {
                            path: "$categoryInfo",
                            preserveNullAndEmptyArrays: true // This prevents documents from being removed
                        }
                    },
                    {
                        $project: {
                            categoryName: {
                                $ifNull: ["$categoryInfo.name", "Unknown Category"]
                            },
                            count: 1,
                            percentage: {
                                $multiply: [
                                    { $divide: ["$count", articleCount] },
                                    100
                                ]
                            }
                        }
                    }
                ]);
            } catch (error) {
                console.log('Aggregation error:', error);
            }
        }

        // Transform comment status counts to expected format
        const statusCounts = {
            approved: 0,
            pending: 0,
            rejected: 0
        };

        commentStatusCounts.forEach(status => {
            statusCounts[status._id] = status.count;
        });


        res.render('admin/dashboard', {
            fullname: req.fullname,
            role: userRole,
            categoryCount,
            commentCount,
            articleCount,
            userCount,
            categoryStatsForChart,
            commentStatsForChart: statusCounts,
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
                // 1st, if img present, then delete old image...
                const folderPath = path.join(process.cwd(), 'public', 'uploads');
                const imagePath = path.join(folderPath, setting.website_logo);

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            // 2nd, save new image...
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
    res.render('admin/users/create', { role: req.role, errors: 0 });
}



const addUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('admin/users/create', {
            role: req.role,
            errors: errors.array()
        })
    }


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

        res.render('admin/users/update', { user, role: req.role, errors: 0 });

    } catch (error) {
        next(error);
    }
};



const updateUser = async (req, res, next) => {

    const id = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('admin/users/update', {
            user: req.body, // populate by old data
            role: req.role,
            errors: errors.array()
        })
    }


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

        const user = await UserModel.findById(id);

        if (!user) {
            return next(createError(404, 'User'));
        }

        const article = await NewsModel.findOne({ author: id });
        if (article) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'This author is associated with an article'
                });
        }

        await user.deleteOne();

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