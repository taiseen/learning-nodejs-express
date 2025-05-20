import mongoose from 'mongoose';

// schema for contact
const contactSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String }
})

// schema for contact collection...
const contacts = mongoose.model('Contact', contactSchema);

export default contacts;