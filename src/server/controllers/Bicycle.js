import async from "async";
import Item from '../models/Items'
import fs from 'fs'

exports.uploadBicycle = (req, res) => {
    let arrOfPhotos = [];

    async.each(req.files, (file, cb) => {
        let photo = {path: file.path};
        arrOfPhotos.push(photo);
        cb();
    });

    Item.addNewItem({
        name: req.body.name,
        model: req.body.model,
        price: req.body.price,
        description: req.body.description,
        photos: arrOfPhotos
    }, (error, response) => {
        if (error) throw error;
        tagsResponse(res);
        res.status(200).send(JSON.stringify(response))
    });
};

exports.getBicycles = (req, res) => {
    Item.all(parseInt(req.params.count) || 0, parseInt(req.params.skp) || 0, (err, response) => {
        if (err) throw err;
        tagsResponse(res);
        console.log(response)
        res.status(200).send(JSON.stringify(response))
    })
};

exports.getBicycleById = (req, res) => {
    let id = req.params.id;
    if (id === undefined || id === null){
        res.sendStatus(400);
    }
    Item.getOneById(id, (err, response) => {
        if (err) throw err;
        tagsResponse(res);
        res.status(200).send(JSON.stringify(response))
    })
};

exports.removeBicycle = (req, res) => {
    let id = req.params.id;
    Item.removeBicycle(id, (err, item) => {
        if (err) res.send(JSON.stringify(err));
        item.photos.map(p => {
            fs.unlink(p.path, err => {
                if (err) throw err;
            })
        });
        console.log(item);
        tagsResponse(res);
        res.send(JSON.stringify(200))
    })
};

function tagsResponse(res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}