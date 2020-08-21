var User = require('../model/user');
var userDao = {
    create: create,
    findByEmailAndCollege: findByEmailAndCollege,
    findByEmail: findByEmail,
    findOne:findOne,
    deleteById: deleteById
}
function create(user) {
    var newUser = new User(user);
    return newUser.save();
}

function findByEmail(emailId) {
    return User.find({ 'emailId': emailId });
}

function findOne(id) {
    return User.findById({ _id: id });
}

function findByEmailAndCollege(emailId, collegeId) {
    return User.find({ 'emailId': emailId, 'collegeId': collegeId });
}

function deleteById(id) {
    return User.findByIdAndRemove(id);
}
module.exports = userDao;