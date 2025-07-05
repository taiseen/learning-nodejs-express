import CategoryModel from "../../models/category.model.js";

const allArticle = (req, res) => {
    res.render('admin/articles', { articles: [], role: req.role });
}

const addArticlePage = async (req, res) => {

    const categories = await CategoryModel.find();
    
    // view folder hierarchy
    res.render('admin/articles/create', { categories, role: req.role });
}

const addArticle = async(req, res) => {
    
    const { title, description, category } = req.body;
    
    try {
        const article = await ArticleModel.create({ title, description, category });        
    } catch (error) {
        console.log('addArticle:- 🔴', error);
        res.status(500).send('Internal Server Error');
    }
}

const updateArticlePage = (req, res) => {
    res.render('admin/articles/update', { role: req.role });
}

const updateArticle = (req, res) => {

}

const deleteArticle = (req, res) => {

}


export {
    updateArticlePage,
    addArticlePage,
    updateArticle,
    deleteArticle,
    allArticle,
    addArticle,
};