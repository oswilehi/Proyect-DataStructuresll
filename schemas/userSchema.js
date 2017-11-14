var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var user = new Schema({
    email : String,
    user : String,
    password: String
});

module.exports = mongoose.model('userSchema', user);