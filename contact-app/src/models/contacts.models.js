import mongoosePaginate from 'mongoose-paginate-v2';
import mongoose from 'mongoose';


// schema for contact
const contactSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String, trim: true },
})


contactSchema.plugin(mongoosePaginate);


// schema for contact collection...
const contacts = mongoose.model('Contact', contactSchema);


export default contacts;