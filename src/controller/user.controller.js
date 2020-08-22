const userDao = require('../dao/user.dao');
const auth = require('../utility/auth');
var userController = {
    checkLogin: checkLogin,
    addUser: addUser,
    findUser: findUser,
    userFromToken: userFromToken,
    deleteUser: deleteUser
}

function addUser(req, res) {
    let user = req.body;
    userDao.findByEmail(user.emailId).
        then((data) => {
            if (data.length > 0) {
                res.send("user already exists")
            }
            else {
                userDao.create(user).
                    then((data) => {
                        res.send(data);
                    })

            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function findUser(req, res) {
    userDao.findOne(req.params.id)
        .then((data) => {
            data.password = null;
            res.send(data);
        }).catch((error) => {
            console.log(error);
        });
}
function userFromToken(req, res) {
    res.send(req.user);
}
function checkLogin(req, res) {
    let user = req.body;
    if (user.emailId === "admin@gmail.com" && user.password === "Admin@123") {
        user._id = 1;
        user.name = "admin";
        user.collegeId = 1;
        user.standardId = 1;
        user.role = "ADMIN";
        const token = auth.generateToken(user);
        res.send({
            "message": "Login successful in as " + user.name,
            "status": "200",
            "role": "ADMIN",
            "token": token
        });
    } else {
        userDao.findByEmailAndCollege(user.emailId, user.collegeId).
            then((data) => {
                if (data.length === 0) {
                    res.send({
                        "message": "Invalid User Credentials",
                        "status": "403"
                    })
                }
                else {
                    let userFromDb = data[0];
                    if (userFromDb.password === user.password) {
                        const token = auth.generateToken(userFromDb);
                        res.send({
                            "message": "Login successful as " + userFromDb.name,
                            "status": "200",
                            "role": userFromDb.role,
                            "token": token
                        });
                    }
                    else {
                        res.send({
                            "message": "Invalid User Credentials",
                            "status": "403"
                        });
                    }
                }

            })

            .catch((error) => {
                console.log(error);
            });
    }
}

function deleteUser(req, res) {
    userDao.deleteById(req.params.id)
        .then((data) => {
            res.send(data);
        }).catch((error) => {
            console.log(error);
        });
}

module.exports = userController; 