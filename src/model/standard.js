const mongoose = require('mongoose');
const Schedule = require('./schedule');
var StandardSchema = new mongoose.Schema({
    standard: String,
    schedules: [Schedule.schema]
});


module.exports = mongoose.model('Standard', StandardSchema);