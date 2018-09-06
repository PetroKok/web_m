import mongoose from 'mongoose';

let photo = mongoose.Schema({
    path: String
});

export default mongoose.model('photo', photo);