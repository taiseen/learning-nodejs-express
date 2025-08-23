import CategoryModel from "../models/category.model.js";
import SettingModel from "../models/setting.model.js";
import NewsModel from "../models/news.model.js";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); // cache for 1 hour in RAM

const loadCommonData = async (_, res, next) => {

    try {

        let latestArticles = cache.get('latestArticles');
        let settingsInfo = cache.get('settingsInfo');
        let categories = cache.get('categories');

        // if cache is expired or not set then get from database
        if (!latestArticles && !settingsInfo && !categories) {

            settingsInfo = await SettingModel.findOne().lean();

            latestArticles = await NewsModel
                .find()
                .populate('category', { name: 1, slug: 1 }) // join query...
                .populate('author', 'fullname') // join query...
                .sort({ createdAt: -1 })
                .limit(5)
                .lean(); // convert to mongoose object to plain JS object


            const categoryUseInArticle = await NewsModel.distinct('category');
            categories = await CategoryModel.find({ _id: { $in: categoryUseInArticle } }).lean();

            // ✅ set the cache
            cache.set('latestArticles', latestArticles);
            cache.set('settingsInfo', settingsInfo);
            cache.set('categories', categories);
        }

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