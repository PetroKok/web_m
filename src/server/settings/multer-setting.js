import multer from 'multer';

// here i can change the name of uploaded files and the path for store
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/files-music')
    },
    filename: function (req, file, cb) {
        //cb(null, Date.now()+ '-' + file.originalname);
        cb(null,file.originalname);
    }
});

exports.multerupload = multer({storage: storage});


let photoStore = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/files-photo')
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    }
});

exports.multerPhotos = multer({storage: photoStore});