import CategoryModel from "../../models/category.model.js";
import createError from "../../utils/createError.js";
import NewsModel from "../../models/news.model.js";
import path from 'path';
import fs from 'fs';



const allArticle = async (req, res, next) => {

    try {
        // populate query do the table join & 2nd parameter get only that field...

        const articles = req.role === 'admin'
            ? await NewsModel.find()
                .populate('category', 'name')
                .populate('author', 'fullname')
            : await NewsModel.find({ author: req.id })
                .populate('category', 'name')
                .populate('author', 'fullname');

        res.render('admin/articles', { articles, role: req.role });

    } catch (error) {
        next(error);
    }
}



const addArticlePage = async (req, res) => {

    const categories = await CategoryModel.find();

    // view folder hierarchy
    res.render('admin/articles/create', { categories, role: req.role });

}


const addArticle = async (req, res, next) => {

    const { title, content, category } = req.body;
    const image = req.file.filename;
    const author = req.id; // author-id

    try {

        const article = new NewsModel({ title, content, category, author, image });

        await article.save();

        res.redirect('/admin/articles');

    } catch (error) {
        next(error);
    }
}



const updateArticlePage = async (req, res, next) => {

    const id = req.params.id;

    console.log({ id });

    try {

        const article = await NewsModel.findById(id)
            .populate('category', 'name')
            .populate('author', 'fullname');

        console.log(article);

        if (!article) {
            return next(createError(404, 'Article'));
        }

        // user ID security checking...
        if (req.role === 'author') {
            if (req.id !== article.author._id.toString()) {
                return next(createError(401));
            }
        }

        const categories = await CategoryModel.find();

        res.render('admin/articles/update', { article, categories, role: req.role });

    } catch (error) {
        next(error);
    }
}



const updateArticle = async (req, res, next) => {

    const { title, content, category } = req.body;
    const id = req.params.id;
    const image = req.file?.filename;

    try {

        const article = await NewsModel.findById(id);

        if (!article) {
            return next(createError(404, 'Article'));
        }

        // user ID security checking...
        if (req.role === 'author') {
            if (req.id !== article.author._id.toString()) {
                return next(createError(401));
            }
        }

        article.title = title || article.title;
        article.content = content || article.content;
        article.category = category || article.category;

        if (image) {
            // Delete old image if it exists
            if (article.image) {
                const folderPath = path.join(process.cwd(), 'public', 'uploads');
                const imagePath = path.join(folderPath, article.image);

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            article.image = image;
        }

        await article.save();

        res.redirect('/admin/articles');

    } catch (error) {
        next(error);
    }
}



const deleteArticle = async (req, res, next) => {

    const id = req.params.id;

    try {

        const article = await NewsModel.findById(id);

        if (!article) {
            return next(createError(404, 'Article'));
        }

        // user ID security checking...
        if (req.role === 'author') {
            if (req.id !== article.author._id.toString()) {
                return next(createError(401));
            }
        }

        try {
            const folderPath = path.join(process.cwd(), 'public', 'uploads');
            const imagePath = path.join(folderPath, article.image);
            fs.unlinkSync(imagePath); // delete image file from file system
        } catch (error) {
            console.error('Error deleting image:', error);
        }

        await article.deleteOne();

        res.json({ success: true });

    } catch (error) {
        next(error);
    }
}


export {
    updateArticlePage,
    addArticlePage,
    updateArticle,
    deleteArticle,
    allArticle,
    addArticle,
};