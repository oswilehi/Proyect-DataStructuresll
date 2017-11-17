var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var message = new Schema({
    message : String,
    sender : String,
    receiver: String,
    date : String,
    privateKey: String
});

module.exports = mongoose.model('messageSchema', message);