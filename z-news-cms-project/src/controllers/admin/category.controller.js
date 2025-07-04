import CategoryModel from "../../models/category.model.js";


const allCategory = async (req, res) => {

    try {
        const categories = await CategoryModel.find();
        res.render('admin/categories', { categories, role: req.role });
    } catch (error) {
        console.log('allCategory:- 🔴', error);
        res.status(500).send('Internal Server Error');
    }
}


const addCategoryPage = (req, res) => {
    res.render('admin/categories/create', { role: req.role, errors: 0 });
}


const addCategory = async (req, res) => {

    const { name, description } = req.body;

    try {
        await CategoryModel.create({ name, description });
        res.redirect('/admin/category'); // html link address...
    } catch (error) {
        console.log('allCategory:- 🔴', error);
        res.status(500).send('Internal Server Error');
    }
}


const updateCategoryPage = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await CategoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.render('admin/categories/update', { category, role: req.role });

    } catch (error) {
        console.log('updateCategoryPage:- 🔴', error);
        res.status(500).send('Internal Server Error');
    }

}


const updateCategory = async (req, res) => {
    const id = req.params.id;

    try {
        const category = await CategoryModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.redirect('/admin/category',); // html link address...
    } catch (error) {
        console.log('updateCategory:- 🔴', error);
        res.status(500).send('Internal Server Error');
    }
}


const deleteCategory = async (req, res) => {
    const id = req.params.id;

    try {
        const category = await CategoryModel.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({ success: true });
    } catch (error) {
        console.log('deleteCategory:- 🔴', error);
        res.status(500).send('Internal Server Error');
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
