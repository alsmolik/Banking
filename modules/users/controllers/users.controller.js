"use strict";

const db = require('../../../db'),
    sha256 = require('sha256');

exports.getAll = function (req, res) {
    let limit = +req.query.limit || 10;
    let offset = +req.query.offset || 0;

    db.User.findAndCountAll({attributes: {exclude: 'password'}, limit: limit, offset: offset})
        .then((users) => {
            res.json({
                metadata: {
                    count: users.count,
                    offset: offset,
                    limit: limit
                },
                users: users.rows
            });
        })
        .catch(() => {
            res.status(500).json({message: 'Произошла ошибка при получении списка пользователей'});
        });
};

exports.create = function (req, res) {
    if (req.body.username && req.body.password) {
        db.User.find({where: {username: req.body.username}})
            .then(user => {
                if (user) {
                    res.status(409).json({message: 'Пользователь с таким логином уже существует'});
                } else {
                    db.User.build({username: req.body.username, password: sha256(req.body.password)}).save()
                        .then(() => {
                            res.status(201).end("Created");
                        })
                        .catch(() => {
                            res.status(500).json({message: 'Произошла ошибка при создании пользователя'})
                        });
                }
            });
    } else {
        res.status(400).json({message: 'Неверно заданы параметры'});
    }
};