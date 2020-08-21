const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const auth = require('../utility/auth');



router.post('/login', userController.checkLogin);
router.post('/',auth.validateAdmin, userController.addUser);
router.get('/:id', userController.findUser);
router.get('/find/token', auth.validateToken, userController.userFromToken);
router.delete('/:id',auth.validateAdmin, userController.deleteUser);
module.exports = router;