import CommentModel from "../../models/comment.model.js";
import createError from "../../utils/createError.js";
import NewsModel from "../../models/news.model.js";



const allComments = async (req, res, next) => {

    const userRole = req.role;
    const userId = req.id;

    try {

        let comments;

        if (userRole === 'admin') {

            comments = await CommentModel.find()
                .populate('article', 'title')
                .sort({ createdAt: -1 });

        } else {

            const articles = await NewsModel.find({ author: userId });
            const articleIds = articles.map(news => news._id);

            comments = await CommentModel.find({ article: { $in: articleIds } })
                .populate('article', 'title')
                .sort({ createdAt: -1 });
        }

        res.render('admin/comments', { role: userRole, comments });

    } catch (error) {
        next(error);
    }
}



const updateCommentStatus = async (req, res, next) => {

    const id = req.params.id;

    const status = req.body.status;

    try {

        const comment = await CommentModel.findByIdAndUpdate(id, { status }, { new: true });

        if (!comment) {
            return next(createError(404, 'Comment'));
        }

        res.json({ success: true });

    } catch (error) {
        next(createError(500, 'Error updating comment status.'));
    }
}



const deleteComment = async (req, res, next) => {

    const id = req.params.id;

    try {

        const comment = await CommentModel.findByIdAndDelete(id);

        if (!comment) {
            return next(createError(404, 'Comment'));
        }

        res.json({ success: true });

    } catch (error) {
        next(createError(500, 'Error deleting comment.'));
    }
}



export {
    updateCommentStatus,
    deleteComment,
    allComments,
}