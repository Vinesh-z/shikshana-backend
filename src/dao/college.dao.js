var College = require('../model/college');
var collegeDao = {
    create: create,
    findAll: findAll,
    findOne: findOne,
    updateSchedules: updateSchedules,
    findSchedules:findSchedules,
    deleteById: deleteById
}
function create(college) {
    var newcollege = new College(college);
    return newcollege.save();
}

function findAll() {
    return College.find({});
}

function findOne(id) {
    return College.findById({ _id: id });
}

function findSchedules(collegeId, standardId) {
    return College.find({ _id: collegeId, standards: { $elemMatch: { _id: standardId } } });
}

function updateSchedules(college, id) {
    var newCollege = {
        standards: college.standards
    };
    return College.findByIdAndUpdate(id, { $set: newCollege }, { new: false });
}

function deleteById(id) {
    return College.findByIdAndRemove(id);
}


module.exports = collegeDao;