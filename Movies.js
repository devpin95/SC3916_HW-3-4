var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

var ActorSchema = new Schema({
    name: {type: String, required: true},
    character: {type: String, required: true}
});

// user schema
var MovieSchema = new Schema({
    title: {type: String, index: { unique: true }},
    releasedate: { type: Date, required: true, default: Date.now },
    genre: String,
    actors: [{name: String, character: String}]
});

// return the model
module.exports = mongoose.model('Actor', ActorSchema);
module.exports = mongoose.model('Movie', MovieSchema);