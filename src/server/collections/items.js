import mongoose from 'mongoose';

let items = mongoose.Schema({
    name: String,
    model: String,
    price: Number,
    description: String,
    photos: [{path: String}]
});

export default mongoose.model('items', items);