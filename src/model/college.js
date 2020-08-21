const mongoose = require('mongoose');
const Standard = require('./standard');
var CollegeSchema = new mongoose.Schema({
    name: String,
    about: String,
    standards: [Standard.schema]
});


module.exports = mongoose.model('College', CollegeSchema);