const mongoose = require('mongoose');

var ScheduleSchema = new mongoose.Schema({
    date: Date,
    time: String,
    subject: String,
    link: String,
    meetingId: String,
    password: String
});


module.exports = mongoose.model('Schedule', ScheduleSchema);