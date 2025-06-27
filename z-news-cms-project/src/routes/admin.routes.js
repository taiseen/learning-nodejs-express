import * as categoryController from '../controllers/admin/category.controller.js';
import * as articleController from '../controllers/admin/article.controller.js';
import * as commentController from '../controllers/admin/comment.controller.js';
import * as userController from '../controllers/admin/user.controller.js';

import express from 'express';

const adminRoutes = express.Router();


// ❇️❇️❇️ Auth & Settings Routes
adminRoutes.get('/', userController.loginPage);
adminRoutes.post('/index', userController.adminLogin); // ⬇️⬇️⬇️
adminRoutes.get('/logout', userController.logout);
adminRoutes.get('/dashboard', userController.dashboard);
adminRoutes.get('/settings', userController.settings);
adminRoutes.post('/save-settings', userController.saveSettings); // ⬇️⬇️⬇️


// 🟩🟩🟩 User CRUD Routes
adminRoutes.get('/users', userController.allUser);
adminRoutes.get('/add-user', userController.addUserPage);
adminRoutes.post('/add-user', userController.addUser); // ⬇️⬇️⬇️
adminRoutes.get('/update-user/:id', userController.updateUserPage);
adminRoutes.post('/update-user/:id', userController.updateUser); // ⬇️⬇️⬇️
adminRoutes.delete('/delete-user/:id', userController.deleteUser); // 🗑️🗑️🗑️


// 🟩🟩🟩 Category CRUD Routes
adminRoutes.get('/category', categoryController.allCategory);
adminRoutes.get('/add-category', categoryController.addCategoryPage);
adminRoutes.post('/add-category', categoryController.addCategory); // ⬇️⬇️⬇️
adminRoutes.get('/update-category/:id', categoryController.updateCategoryPage);
adminRoutes.post('/update-category/:id', categoryController.updateCategory); // ⬇️⬇️⬇️
adminRoutes.delete('/delete-category/:id', categoryController.deleteCategory); // 🗑️🗑️🗑️


// 🟩🟩🟩 Article CRUD Routes
adminRoutes.get('/articles', articleController.allArticle);
adminRoutes.get('/articles/new', articleController.addArticlePage);
adminRoutes.post('/articles', articleController.addArticle); // ⬇️⬇️⬇️
adminRoutes.get('/articles/:id/edit', articleController.updateArticlePage);
adminRoutes.post('/articles/:id', articleController.updateArticle); // ⬇️⬇️⬇️
adminRoutes.delete('/articles/:id', articleController.deleteArticle); // 🗑️🗑️🗑️


// 🟩🟩🟩 Comment Routes
adminRoutes.get('/comments', commentController.allComments);


export default adminRoutes;