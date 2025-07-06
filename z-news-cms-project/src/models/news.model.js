import mongoosePaginate from 'mongoose-paginate-v2';
import mongoose from 'mongoose';


const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    category: {
        // this work like join table query...
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    author: {
        // this work like join table query...
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    image: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});


newsSchema.plugin(mongoosePaginate)


const NewsModel = mongoose.model('News', newsSchema);


export default NewsModel;
