var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/JOnline");
mongoose.connection.on('open', function(ref){
    console.log("Connected to mongo server users.");
});
mongoose.connection.on('error', function(err){
    console.log('Could not connect to mongo server!');
    console.log(err);
});

mongoose.connect('mongodb://localhost/mongodb');
var user = new Schema({
    email : String,
    user : String,
    password: String,
    privateKey: String
});

module.exports = mongoose.model('userSchema', user);