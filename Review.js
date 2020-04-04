var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);


// user schema
var ReviewSchema = new Schema({
    title: {type: String, required: true},
    username: {type: String, required: true},
    review: {type: String, required: true},
    rating: {type: Number, required: true}
});

// return the model
module.exports = mongoose.model('Review', ReviewSchema);