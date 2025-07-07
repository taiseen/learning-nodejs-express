import CategoryModel from "../../models/category.model.js";
import createError from "../../utils/createError.js";



const allCategory = async (req, res, next) => {

    try {

        const categories = await CategoryModel.find();

        // render ejs file... for view...
        // so based on this file render html page...
        // and by these parameters send data...
        // dynamic data render at html page in client side browser...
        res.render('admin/categories', { categories, role: req.role });

    } catch (error) {
        next(error);
    }
}



const addCategoryPage = (req, res) => {
    res.render('admin/categories/create', { role: req.role, errors: 0 });
}



const addCategory = async (req, res, next) => {

    const { name, description } = req.body;

    try {

        await CategoryModel.create({ name, description });

        res.redirect('/admin/category'); // html link address...

    } catch (error) {
        next(error);
    }
}



const updateCategoryPage = async (req, res, next) => {

    const { id } = req.params;

    try {

        const category = await CategoryModel.findById(id);

        if (!category) {
            return next(createError(404, 'Category'));
        }

        res.render('admin/categories/update', { category, role: req.role });

    } catch (error) {
        next(error);
    }

}



const updateCategory = async (req, res, next) => {

    const id = req.params.id;

    try {

        const category = await CategoryModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!category) {
            return next(createError(404, 'Category'));
        }

        res.redirect('/admin/category',); // html link address...
    } catch (error) {
        next(error);
    }
}



const deleteCategory = async (req, res, next) => {

    const id = req.params.id;

    try {

        const category = await CategoryModel.findByIdAndDelete(id);

        if (!category) {
            return next(createError(404, 'Category'));
        }

        res.json({ success: true });

    } catch (error) {
        next(error);
    }
}



export {
    updateCategoryPage,
    addCategoryPage,
    deleteCategory,
    updateCategory,
    addCategory,
    allCategory,
}
