import mongoose from 'mongoose'

let state = {
    database: null
};

exports.connect = (url, done) => {
    if(state.database) return done();
    mongoose.connect(url, {useNewUrlParser: true}, (err, database) => {
        if(err) throw err;
        state.database = database;
        done();
    })
};

exports.get = () => {
    return state.database;
};

exports.getStatus = () => {
  if(state.database) return "Connected to database!";
  return "Disconnected";
};
