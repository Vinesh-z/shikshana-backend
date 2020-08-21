const jwt = require('jsonwebtoken');
const jwtKey = require('../config/jwtKey');

var authHandler = {

    generateToken: generateToken,
    validateToken: validateToken,
    validateAdmin:validateAdmin
}
function generateToken(user) {
    return jwt.sign({
        userId: user._id,
        name: user.name,
        emailId: user.emailId,
        collegeId: user.collegeId,
        standardId: user.standardId,
        role: user.role
    }, jwtKey,
        {
            expiresIn: "1d"
        });
}

function validateToken(req, res, next) {
    try {
        if (jwt.verify(req.headers.token, jwtKey)) {
            var user = jwt.verify(req.headers.token, jwtKey);
            req.message = 'valid user';
            req.user = user;
            next();
        }
        else {
            res.header('Unauthorized', 1);
            res.header("Access-Control-Expose-Headers", "Unauthorized");
            res.status(401).send({ "message": "Token Corrupted" });
        }
    } catch (JsonWebTokenError) {
        res.header('Unauthorized', 1);
        res.header("Access-Control-Expose-Headers", "Unauthorized");
        res.send({ "message": "Token Corrupted" });
    }
}

function validateAdmin(req, res, next) {
    try {
        if (jwt.verify(req.headers.token, jwtKey)) {
            var user = jwt.verify(req.headers.token, jwtKey);
            req.message = 'valid user';
            req.user = user;

            if (user.role === 'ADMIN') {
                next();
            } else {
                res.header('Unauthorized', 1);
                res.header("Access-Control-Expose-Headers", "Unauthorized");
                res.status(401).send({ "message": "Not an admin, Unauthorized" });
            }
        }
        else {
            res.header('Unauthorized', 1);
            res.header("Access-Control-Expose-Headers", "Unauthorized");
            res.status(401).send({ "message": "Token Corrupted" });
        }
    } catch (JsonWebTokenError) {
        res.header('Unauthorized', 1);
        res.header("Access-Control-Expose-Headers", "Unauthorized");
        res.send({ "message": "Token Corrupted" });
    }
}

module.exports = authHandler;