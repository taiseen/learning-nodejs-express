import CategoryModel from "../models/category.model.js";
import SettingModel from "../models/setting.model.js";
import NewsModel from "../models/news.model.js";


const loadCommonData = async (_, res, next) => {

    try {

        const settingsInfo = await SettingModel.findOne();


        const latestArticles = await NewsModel
            .find()
            .populate('category', { name: 1, slug: 1 }) // join query...
            .populate('author', 'fullname') // join query...
            .sort({ createdAt: -1 }).limit(5);


        const categoryUseInArticle = await NewsModel.distinct('category');
        const categories = await CategoryModel.find({ _id: { $in: categoryUseInArticle } });


        // when need the same value to access in all routes then store in res.locals
        res.locals.latestArticles = latestArticles;
        res.locals.settingsInfo = settingsInfo;
        res.locals.categories = categories;

        next();

    } catch (error) {
        next(error);
    }
}

export default loadCommonData;