import * as categoryController from '../controllers/admin/category.controller.js';
import * as articleController from '../controllers/admin/article.controller.js';
import * as commentController from '../controllers/admin/comment.controller.js';
import * as userController from '../controllers/admin/user.controller.js';

import fileUpload from '../middleware/multer.js';
import isLogIn from '../middleware/isLogin.js';
import isAdmin from '../middleware/isAdmin.js';
import express from 'express';

const adminRoutes = express.Router();


// ❇️❇️❇️ Auth & Settings Routes
adminRoutes.get('/', userController.loginPage);
adminRoutes.post('/index', userController.adminLogin); // ⬇️⬇️⬇️
adminRoutes.get('/logout', isLogIn, userController.logout);
adminRoutes.get('/dashboard', isLogIn, userController.dashboardPage);
adminRoutes.get('/settings', isLogIn, isAdmin, userController.settings);
adminRoutes.post('/save-settings', isLogIn, isAdmin, fileUpload.single('website_logo'), userController.saveSettings); // ⬇️⬇️⬇️


// 🟩🟩🟩 User CRUD Routes
adminRoutes.get('/users', isLogIn, isAdmin, userController.allUser);
adminRoutes.get('/add-user', isLogIn, isAdmin, userController.addUserPage);
adminRoutes.post('/add-user', isLogIn, isAdmin, userController.addUser); // ⬇️⬇️⬇️
adminRoutes.get('/update-user/:id', isLogIn, isAdmin, userController.updateUserPage);
adminRoutes.post('/update-user/:id', isLogIn, isAdmin, userController.updateUser); // ⬇️⬇️⬇️
adminRoutes.delete('/delete-user/:id', isLogIn, isAdmin, userController.deleteUser); // 🗑️🗑️🗑️


// 🟩🟩🟩 Category CRUD Routes
adminRoutes.get('/category', isLogIn, isAdmin, categoryController.allCategory);
adminRoutes.get('/add-category', isLogIn, isAdmin, categoryController.addCategoryPage);
adminRoutes.post('/add-category', isLogIn, isAdmin, categoryController.addCategory); // ⬇️⬇️⬇️
adminRoutes.get('/update-category/:id', isLogIn, isAdmin, categoryController.updateCategoryPage);
adminRoutes.post('/update-category/:id', isLogIn, isAdmin, categoryController.updateCategory); // ⬇️⬇️⬇️
adminRoutes.delete('/delete-category/:id', isLogIn, isAdmin, categoryController.deleteCategory); // 🗑️🗑️🗑️


// 🟩🟩🟩 Article CRUD Routes
adminRoutes.get('/articles', isLogIn, articleController.allArticle);
adminRoutes.get('/article/new', isLogIn, articleController.addArticlePage);
adminRoutes.post('/add-article', isLogIn, fileUpload.single('image'), articleController.addArticle); // ⬇️⬇️⬇️
adminRoutes.get('/article/:id/edit', isLogIn, articleController.updateArticlePage);
adminRoutes.post('/updata-article/:id', isLogIn, fileUpload.single('image'), articleController.updateArticle); // ⬇️⬇️⬇️
adminRoutes.delete('/delete-article/:id', isLogIn, articleController.deleteArticle); // 🗑️🗑️🗑️


// 🟩🟩🟩 Comment Routes
adminRoutes.get('/comments', isLogIn, commentController.allComments);


export default adminRoutes;