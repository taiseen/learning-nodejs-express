import CategoryModel from "../models/category.model.js";
import CommentModel from "../models/comment.model.js";
import createError from "../utils/createError.js";
import NewsModel from "../models/news.model.js";
import paginate from "../utils/paginate.js";



const index = async (req, res) => {

    // const articles = await NewsModel
    //     .find()
    //     .populate('category', { name: 1, slug: 1 }) // join query...
    //     .populate('author', 'fullname') // join query...
    //     .sort({ createdAt: -1 });

    const paginatedArticles = await paginate(
        NewsModel,
        {},
        req.query,
        {
            sort: '-createdAt',
            populate: [
                { path: 'category', select: 'name slug' }, // join query...
                { path: 'author', select: 'fullname' } // join query...
            ]
        }
    );

    // res.json({ paginatedArticles });
    res.render('index', { paginatedArticles, query: req.query });
}




const articleByCategories = async (req, res) => {

    const slug = req.params.name;

    const category = await CategoryModel.findOne({ slug });
    if (!category) {
        return res.status(404).send('Category not found');
    }

    const paginatedArticles = await paginate(
        NewsModel,
        { category: category._id },
        req.query,
        {
            sort: '-createdAt',
            populate: [
                { path: 'category', select: 'name slug' },
                { path: 'author', select: 'fullname' }
            ]
        }
    );

    res.render('category', { paginatedArticles, categoryName: category.name, query: req.query });
}




const singleArticle = async (req, res) => {

    const articleId = req.params.id; // come from url

    const singleNews = await NewsModel
        .findById(articleId)
        .populate('category', { name: 1, slug: 1 }) // join query...
        .populate('author', 'fullname') // join query...
        .sort({ createdAt: -1 });

    if (!singleNews) return next(createError(404, 'Article'));

    const comments = await CommentModel
        .find({ article: articleId, status: 'approved' })
        .sort({ createdAt: -1 });

    res.render('single', { singleNews, comments });
}




const search = async (req, res) => {

    const searchQuery = req.query.search || '';

    // const foundedArticles = await NewsModel
    //     .find({
    //         $or: [
    //             { title: { $regex: searchQuery, $options: 'i' } },
    //             { content: { $regex: searchQuery, $options: 'i' } }
    //         ]
    //     })
    //     .populate('category', { name: 1, slug: 1 }) // join query...
    //     .populate('author', 'fullname') // join query...
    //     .sort({ createdAt: -1 });

    const paginatedArticles = await paginate(
        NewsModel,
        {
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { content: { $regex: searchQuery, $options: 'i' } }
            ]
        },
        req.query,
        {
            sort: '-createdAt',
            populate: [
                { path: 'category', select: 'name slug' },
                { path: 'author', select: 'fullname' }
            ]
        }
    );

    res.render('search', { paginatedArticles, searchQuery, query: req.query });
}




const author = async (req, res) => {

    const authorId = req.params.name;

    const author = await NewsModel.findOne({ author: authorId });
    if (!author) return res.status(404).send('Author not found');

    const paginatedArticles = await paginate(
        NewsModel,
        { author: authorId },
        req.query,
        {
            sort: '-createdAt',
            populate: [
                { path: 'category', select: 'name slug' },
                { path: 'author', select: 'fullname' }
            ]
        }
    );

    const authorName = paginatedArticles.data[0].author.fullname;

    res.render('author', { paginatedArticles, authorName, query: req.query });
}




const addComment = async (req, res, next) => {

    const articleId = req.params.id; // come from url

    const { name, email, content } = req.body; // come from user input form

    try {

        const article = await NewsModel.findById(articleId);

        if (!article) {
            return next(createError(404, 'Article'));
        }

        const newComment = await CommentModel({
            name,
            email,
            content,
            article: articleId
        });

        await newComment.save();

        res.redirect(`/single/${articleId}`);

    } catch (error) {
        next(error);
    }
}




export {
    articleByCategories,
    singleArticle,
    addComment,
    search,
    author,
    index,
};