"use strict";

const db = require('../../../db');
const usersService = new (require('../services/users.service'))(db.User);
const handleError = require('../../../helpers/handleError');

exports.getAll = function (req, res) {
    let limit = +req.query.limit || 10;
    let offset = +req.query.offset || 0;

    usersService.getAll(limit, offset)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(err.statusCode || 500).json({message: err.message});
        });
};

exports.create = function (req, res) {
    if (req.body.username && req.body.password) {
        usersService.create(req.body)
            .then(() => res.end('Created'))
            .catch(err => res.status(err.statusCode || 500).json(handleError(err)));
    } else {
        res.status(400).json({message: 'Неверно заданы параметры'});
    }
};

exports.getUserData = function (req, res) {
    res.json({id: req.user.id, username: req.user.username});
};