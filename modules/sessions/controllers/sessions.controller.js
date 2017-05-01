"use strict";

const db = require('../../../db');
const sessionsService = new (require('../services/sessions.service'))(db.User);

exports.create = function (req, res) {
    if (req.body.username && req.body.password) {
        sessionsService.create(req.body.username, req.body.password)
            .then(result => res.json(result))
            .catch(err => res.status(err.statusCode || 500).json({message: err.message}));
    } else {
        res.status(400).json({message: 'Неверно заданы параметры'});
    }
};