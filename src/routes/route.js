const express = require('express');
const router = express.Router();
const userRoutes = require('../routes/user.routes');
const collegeRoutes = require('../routes/college.routes');

router.use('/user', userRoutes );
router.use('/college', collegeRoutes );
module.exports = router;