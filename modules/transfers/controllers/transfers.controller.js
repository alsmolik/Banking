"use strict";

const db = require('../../../db');
const transfersService = new (require('../services/transfers.service'))(db.sequelize, db.Card, db.Transfer);
const handleError = require('../../../helpers/handleError');

exports.create = function (req, res) {
    if (req.body.cardId && req.body.destinationCardNumber && req.body.amount) {
        transfersService.create(req.user.id, req.body.cardId, req.body.destinationCardNumber, +req.body.amount, req.body.notes)
            .then(() => res.status(201).end('Added'))
            .catch(err => res.status(err.statusCode || 500).json(handleError(err)));
    } else {
        res.status(400).json({message: 'Неверно заданы параметры'});
    }
};

exports.getUserTransfersList = function (req, res) {
    if (req.params.userId == req.user.id) {
        transfersService.getUserTransfersList(req.params.userId, +req.query.limit || 10, +req.query.offset || 0)
            .then(result => res.json(result))
            .catch(err => res.status(err.statusCode || 500).json(handleError(err)));
    } else {
        res.status(400).json({message: 'Вы не можете просматривать чужие переводы'});
    }
};