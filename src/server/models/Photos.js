import Photo from '../collections/photos'

exports.all = (cb) => {
    Photo.find({}, (err, res) => {
        cb(err, res);
    });
};

exports.addNewPhoto = (data, cb) => {
    let photo = new Photo(data);
    photo.save( (err, res) => {
        cb(err, res);
    })
};