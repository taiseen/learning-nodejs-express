import mongoose from 'mongoose';


const commentSchema = new mongoose.Schema({
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
});


module.exports = mongoose.model('Comment', commentSchema);