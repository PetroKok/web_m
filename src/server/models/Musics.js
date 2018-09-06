import Music from '../collections/music'
import fs from 'fs'

exports.all = (cb) => {
    Music.find({}, (err, res) => {
        cb(err, res);
    });
};

exports.addNewMusic = (data, cb) => {
    let music = new Music(data);
    music.save((err, res) => {
        cb(err, res);
    })
};

exports.removeMusic = (id, cb) => {
    Music.find({_id: id}, (err, response1) => {
        if (err) throw err;
        Music.findByIdAndRemove(id, (err, response2) => {
            if (err) throw err;
            fs.unlink('./'+response1[0].path, err => {
                if (err) throw err;
                fs.unlink('./'+response1[0].img, err2 => {
                    if (err2) throw err2;
                    cb(err2, response2)
                });
            });

        })

    })
}