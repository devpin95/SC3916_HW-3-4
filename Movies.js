var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

// user schema
var MovieSchema = new Schema({
    title: {type: String, index: { unique: true }},
    releasedate: { type: Date, required: true, default: Date.now },
    genre: String,
    actors: [{name: String, character: String}]
});

// return the model
module.exports = mongoose.model('Movie', MovieSchema);