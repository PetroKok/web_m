import mongoose from 'mongoose';

let music = mongoose.Schema({
    title: String,
    path: String,
    img: String
});

export default mongoose.model('music', music);