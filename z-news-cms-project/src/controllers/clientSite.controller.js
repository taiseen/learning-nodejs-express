const index = (req, res) => {

    res.render('index');
}

const articleByCategories = (req, res) => {
    res.render('category');
}

const singleArticle = (req, res) => {
    res.render('single');
}

const search = (req, res) => {
    res.render('search');
}

const author = (req, res) => {
    res.render('author');
}

const addComment = (req, res) => {

}

export {
    articleByCategories,
    singleArticle,
    addComment,
    search,
    author,
    index,
};