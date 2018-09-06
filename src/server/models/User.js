import User from '../collections/User'

exports.getById = (id, cb) => {
    User.findById(id)
        .then( user => cb(null, user))
        .catch( err => cb(err))
}

exports.getOne = (data, cb) => {
    User.findOne(data)
        .then( user => cb(null, user))
        .catch( err => cb(err))
}

exports.saveOne = (data, cb) => {
    let user = new User(data)
    user.save()
        .then( user => cb(null, user))
        .catch( err => cb(err) )
}
