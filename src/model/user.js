const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    collegeId: String,
    standardId: String,
    emailId: String,
    password: String,
    role: {type:String, default: 'USER'}
});


module.exports = mongoose.model('User', UserSchema);