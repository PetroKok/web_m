import Item from '../collections/items'

exports.all = (lim, skip, cb) => {
    Item.find({})
        .skip(skip)
        .limit(lim)
        .sort({name: 1})
        .exec((err, res) => {
            cb(err, res);
        })
};

exports.addNewItem = (data, cb) => {
    let item = new Item(data);
    item.save((err, res) => {
        cb(err, res);
    })
};

exports.removeBicycle = (id, cb) => {
    Item.findByIdAndRemove(id, (err, item) => {
        console.log(item);
        cb(err, item)
    })
};

exports.getOneById = (id, cb) => {
    Item.findById(id, (err, obj) => {
        cb(err, obj);
    })
};