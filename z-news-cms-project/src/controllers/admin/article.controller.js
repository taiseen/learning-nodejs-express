
const allArticle = (req, res) => {
    res.render('admin/articles', { articles: [], role: req.role });
}

const addArticlePage = (req, res) => {
    res.render('admin/articles/create', { role: req.role });
}

const addArticle = (req, res) => {

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