const express = require('express');
const router = express.Router();
const collegeController = require('../controller/college.controller');
const auth = require('../utility/auth');


router.post('/',auth.validateAdmin, collegeController.addCollege);
router.get('/', collegeController.findColleges);
router.get('/schedules/:collegeId/:standardId',auth.validateToken, collegeController.findSchedules);
router.get('/:id', collegeController.findCollegeById);
router.put('/',auth.validateAdmin, collegeController.updateCollege);
router.delete('/:id',auth.validateAdmin, collegeController.deleteCollege);
module.exports = router;