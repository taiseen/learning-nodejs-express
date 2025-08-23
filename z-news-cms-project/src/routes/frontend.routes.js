import * as clientSite from '../controllers/clientSite.controller.js';
import loadCommonData from '../middleware/loadCommonData.js';
import express from 'express';


const frontendRoutes = express.Router();


frontendRoutes.use(loadCommonData); // use this middleware for all frontend routes...


frontendRoutes.get('/', clientSite.index);
frontendRoutes.get('/search', clientSite.search);
frontendRoutes.get('/author/:name', clientSite.author);
frontendRoutes.get('/single/:id', clientSite.singleArticle);
frontendRoutes.get('/category/:name', clientSite.articleByCategories);

frontendRoutes.post('/single/:id/comment', clientSite.addComment); // ⬇️⬇️⬇️


frontendRoutes.get('/json', clientSite.testingWebPerformance);


// 🟥🟥🟥 404 Middleware - for Route related error display...
frontendRoutes.use((_, res) => {
    res.status(404).render('404', {
        message: '🔎 Route Not Found...',
    })
});



// 🟥🟥🟥 500 Error Handler - for Server-Coding || DB related error display...
frontendRoutes.use((error, req, res, next) => {

    console.error('🔴🔴🔴 ' + error.stack);

    const status = error.status || 500;

    const message = error.message.includes('ObjectId failed')
        ? '🔎 Page Not Found... '
        : error.message || 'Something went wrong';

    res
        .status(status)
        .render('errors', { message, status })
});



export default frontendRoutes;