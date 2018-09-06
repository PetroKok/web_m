import async from 'async'
import Music from '../models/Musics'

exports.uploadFiles = (req, res) => {
    const filesArr = req.files;
    console.log(filesArr);
    let typeIMAGE = 1;
    async.each(filesArr, (file, cb) => {
            if(file.mimetype === "audio/mp3"){
                Music.addNewMusic({title: file.filename, path: file.path, img: filesArr[typeIMAGE]["path"] }, (error, response) => {
                    if (error) return console.error(error);
                });
            }
            typeIMAGE = 0;
            cb();
        },
        err => {
            if (err) throw err;
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.send(JSON.stringify("200"));
        })
};

exports.getSomeMusic = (req, res) => {
    Music.all((err, data) => {
        if (err) return console.error(err);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(JSON.stringify(data));
    })

};

exports.removeMusic = (req, res) => {
    console.log("REMOVE");
    Music.removeMusic(req.params.id, (err, response) => {
        if(err) throw err;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(JSON.stringify(response))
    })
}