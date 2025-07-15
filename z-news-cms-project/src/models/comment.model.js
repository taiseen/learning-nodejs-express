import mongoose from 'mongoose';


const commentSchema = new mongoose.Schema(
    {
        article: {
            // this work like join table query...
            type: mongoose.Schema.Types.ObjectId,
            ref: 'News',
            required: true
        },

        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        content: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
            required: true
        }
    },
    {
        timestamps: true
    }
);


const CommentModel = mongoose.model('Comment', commentSchema);


export default CommentModel;