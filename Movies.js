var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

// user schema
var MovieSchema = new Schema({
    title: String,
    releasedate: { type: Date, required: true, default: Date.now },
    genre: String,
    actors: [{name: String, character: String}]
});


// UserSchema.methods.comparePassword = function(password, callback) {
//     var user = this;
//
//     bcrypt.compare(password, user.password, function(err, isMatch) {
//         callback(isMatch) ;
//     });
// };

// return the model
module.exports = mongoose.model('Movie', MovieSchema);