

const allCategory = (req, res) => {

    res.render('admin/categories', { categories: [], role: req.role });
}

const addCategoryPage = (req, res) => {
    res.render('admin/categories/create', { role: req.role });
}

const addCategory = (req, res) => {

}


const updateCategoryPage = (req, res) => {
    res.render('admin/categories/update', { role: req.role });
}

const updateCategory = (req, res) => {

}

const deleteCategory = (req, res) => {

}


export {
    updateCategoryPage,
    addCategoryPage,
    deleteCategory,
    updateCategory,
    addCategory,
    allCategory,
}
