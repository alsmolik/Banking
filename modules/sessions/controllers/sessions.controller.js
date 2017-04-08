"use strict";

const db = require('../../../db'),
    sha256 = require('sha256'),
    jwt = require('jsonwebtoken'),
    config = require('../../../config.json');

exports.create = function (req, res) {
    if (req.body.username && req.body.password) {
        db.User.find({where: {username: req.body.username}})
            .then(user => {
                if (user) {
                    if (user.password == sha256(req.body.password)) {
                        res.json({token: jwt.sign({id: user.id, username: user.username}, config.secret_key)});
                    } else {
                        res.status(400).json({message: 'Неверный пароль'});
                    }
                } else {
                    res.status(400).json({message: 'Пользователя с таким логином не существует'});
                }
            });
    } else {
        res.status(400).json({message: 'Неверно заданы параметры'});
    }
};