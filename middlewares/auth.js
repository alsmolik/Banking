const jwt = require('jsonwebtoken'),
    config = require('../config.json');

module.exports = function (req, res, next) {
    if (req.token != undefined) {
        jwt.verify(req.token, config.secret_key, (err, decoded) => {
            if (err) {
                res.status(401).end();
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).end();
    }
};