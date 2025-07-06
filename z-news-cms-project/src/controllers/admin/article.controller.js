import CategoryModel from "../../models/category.model.js";
import NewsModel from "../../models/news.model.js";
import path from 'path';
import fs from 'fs';


const allArticle = async (req, res) => {
    let articles = [];

    try {
        if (req.role === 'admin') {
            // populate query do the table join & 2nd parameter get only that field...
            articles = await NewsModel.find()
                .populate('category', 'name')
                .populate('author', 'fullname');

        } else {
            articles = await NewsModel.find({ author: req.id })
                .populate('category', 'name')
                .populate('author', 'fullname');
        }

        res.render('admin/articles', { articles, role: req.role });
    } catch (error) {
        console.log('allArticle:- 🔴', error);
        res.status(500).send('Internal Server Error');
    }
}


const addArticlePage = async (req, res) => {
    const categories = await CategoryModel.find();
    // view folder hierarchy
    res.render('admin/articles/create', { categories, role: req.role });
}


const addArticle = async (req, res) => {

    const { title, content, category } = req.body;
    const image = req.file.filename;
    const author = req.id; // author-id

    try {
        const article = new NewsModel({ title, content, category, author, image });

        await article.save();

        res.redirect('/admin/articles');

    } catch (error) {
        console.log('addArticle:- 🔴', error);
        res.status(500).send('Internal Server Error');
    }
}


const updateArticlePage = async (req, res) => {
    const id = req.params.id;


    try {
        const article = await NewsModel.findById(id)
            .populate('category', 'name')
            .populate('author', 'fullname');

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

         // user ID security checking...
        if (req.role === 'author') {
            if (req.id !== article.author._id.toString()) {
                return res.status(401).send('You Are Unauthorized...');
            }
        }

        const categories = await CategoryModel.find();

        res.render('admin/articles/update', { article, categories, role: req.role });
    } catch (error) {
        console.log('updateArticlePage:- 🔴', error);
        res.status(500).send('Internal Server Error');
    }
}


const updateArticle = async (req, res) => {

    const { title, content, category } = req.body;
    const id = req.params.id;
    const image = req.file?.filename;

    try {

        const article = await NewsModel.findById(id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // user ID security checking...
        if (req.role === 'author') {
            if (req.id !== article.author._id.toString()) {
                return res.status(401).send('You Are Unauthorized...');
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
        console.log('updateArticle:- 🔴', error);
        res.status(500).send('Internal Server Error');
    }
}


const deleteArticle = async (req, res) => {

    const id = req.params.id;

    try {

        const article = await NewsModel.findById(id);

        if (!article) {
            return next(createError('Article not found', 404));
        }

        // user ID security checking...
        if (req.role === 'author') {
            if (req.id !== article.author._id.toString()) {
                return res.status(401).send('You Are Unauthorized...');
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
        console.log('deleteArticle:- 🔴', error);
        res.status(500).send('Internal Server Error');
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