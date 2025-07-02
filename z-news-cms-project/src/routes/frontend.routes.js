import * as clientSite from '../controllers/clientSite.controller.js';
import express from 'express';


const frontendRoutes = express.Router();


frontendRoutes.get('/', clientSite.index);
frontendRoutes.get('/search', clientSite.search);
frontendRoutes.get('/author/:name', clientSite.author);
frontendRoutes.get('/single/:id', clientSite.singleArticle);
frontendRoutes.post('/single/:id', clientSite.addComment); // ⬇️⬇️⬇️
frontendRoutes.get('/category/:name', clientSite.articleByCategories);


export default frontendRoutes;