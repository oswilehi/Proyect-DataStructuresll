var mongoose = require('mongoose');

var Schema = mongoose.Schema;
/*mongoose.connect("mongodb://localhost:27017/JOnline");
mongoose.connection.on('open', function(ref){
    console.log("Connected to mongo server messages.");
});
mongoose.connection.on('error', function(err){
    console.log('Could not connect to mongo server!');
    console.log(err);
});

mongoose.connect('mongodb://localhost/mongodb');*/
var message = new Schema({
    message : String,
    sender : String,
    receiver: String,
    privateKey: String
});

module.exports = mongoose.model('messageSchema', message);