"use strict";

const db = require('../../../db');
const paymentsService = new (require('../services/payments.service'))(db.sequelize, db.Card, db.Service, db.ServiceCategory, db.Payment);
const handleError = require('../../../helpers/handleError');

exports.create = function (req, res) {
    if (req.body.serviceId && req.body.cardId && req.body.amount) {
        paymentsService.create(req.user.id, req.body.serviceId, req.body.cardId, req.body.amount)
            .then(() => res.status(201).end('Added'))
            .catch(err => res.status(err.statusCode || 500).json(handleError(err)));
    } else {
        res.status(400).json({message: 'Неверно заданы параметры'});
    }
};

exports.getUserPaymentsList = function (req, res) {
    if (req.params.userId == req.user.id) {
        paymentsService.getUserPaymentsList(req.params.userId, +req.query.limit || 10, +req.query.offset || 0)
            .then(result => res.json(result))
            .catch(err => res.status(err.statusCode || 500).json(handleError(err)));
    } else {
        res.status(400).json({message: 'Вы не можете просматривать чужие платежи'});
    }
};