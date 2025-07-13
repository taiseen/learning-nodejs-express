import CategoryModel from "../models/category.model.js";
import NewsModel from "../models/news.model.js";



const index = async (_, res) => {

    const articles = await NewsModel
        .find()
        .populate('category', { name: 1, slug: 1 }) // join query...
        .populate('author', 'fullname') // join query...
        .sort({ createdAt: -1 });

    res.render('index', { articles });
}




const articleByCategories = async (req, res) => {

    const slug = req.params.name;

    const category = await CategoryModel.findOne({ slug });
    if (!category) {
        return res.status(404).send('Category not found');
    }

    const articles = await NewsModel
        .find({ category: category._id })
        .populate('category', { name: 1, slug: 1 }) // join query...
        .populate('author', 'fullname') // join query...
        .sort({ createdAt: -1 });

    res.render('category', { articles, categoryName: category.name });
}




const singleArticle = async (req, res) => {

    const articleId = req.params.id;

    const singleNews = await NewsModel
        .findById(articleId)
        .populate('category', { name: 1, slug: 1 }) // join query...
        .populate('author', 'fullname') // join query...
        .sort({ createdAt: -1 });

    if (!singleNews) return res.status(404).send('Article not found');

    res.render('single', { singleNews });
}




const search = async (req, res) => {

    const searchQuery = req.query.search || '';

    const foundedArticles = await NewsModel
        .find({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { content: { $regex: searchQuery, $options: 'i' } }
            ]
        })
        .populate('category', { name: 1, slug: 1 }) // join query...
        .populate('author', 'fullname') // join query...
        .sort({ createdAt: -1 });

    res.render('search', { articles: foundedArticles, searchQuery });
}




const author = async (req, res) => {

    const authorId = req.params.name;

    const articles = await NewsModel
        .find({ author: authorId })
        .populate('category', { name: 1, slug: 1 }) // join query...
        .populate('author', 'fullname') // join query...
        .sort({ createdAt: -1 });

    const authorName = articles[0].author.fullname;

    res.render('author', { articles, authorName });
}




const addComment = async (req, res) => {

}




export {
    articleByCategories,
    singleArticle,
    addComment,
    search,
    author,
    index,
};