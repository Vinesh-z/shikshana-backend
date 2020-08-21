const collegeDao = require('../dao/college.dao');
var collegeController = {
    addCollege: addCollege,
    updateCollege: updateCollege,
    findColleges: findColleges,
    findCollegeById: findCollegeById,
    findSchedules: findSchedules,
    deleteCollege: deleteCollege
}

function addCollege(req, res) {
    let college = req.body;
    collegeDao.create(college).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateCollege(req, res) {
    let college = req.body;
    collegeDao.updateSchedules(college, college._id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findSchedules(req, res) {
    collegeDao.findSchedules(req.params.collegeId, req.params.standardId).
        then((data) => {
            if (data.length > 0) {
                standard = data[0].standards.filter(standard => standard._id == req.params.standardId)
                res.send(standard);
            } else {
                res.send({message:"No schedules found"});
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function findColleges(req, res) {
    collegeDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findCollegeById(req, res) {
    collegeDao.findOne(req.params.id)
        .then((data) => {
            res.send(data);
        }).catch((error) => {
            console.log(error);
        });
}

function deleteCollege(req, res) {
    collegeDao.deleteById(req.params.id)
        .then((data) => {
            res.send(data);
        }).catch((error) => {
            console.log(error);
        });
}

module.exports = collegeController; 