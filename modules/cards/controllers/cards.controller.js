"use strict";

const db = require('../../../db');
const cardsService = new (require('../services/cards.service'))(db.Card);
const handleError = require('../../../helpers/handleError');

exports.create = function (req, res) {
    let card = req.body;
    card.UserId = req.user.id;

    cardsService.create(req.body)
        .then(() => res.end('Created'))
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError' && err.fields.number) {
                res.status(400).json({message: 'Эта карта уже привязана к другой учетной записи'});
            } else {
                res.status(err.statusCode || 500).json(handleError(err))
            }
        });
};

exports.getUserCards = function (req, res) {
    if (req.params.userId == req.user.id) {
        cardsService.getUserCards(req.params.userId, +req.query.limit || 10, +req.query.offset || 0)
            .then(result => res.json(result))
            .catch(err => res.status(err.statusCode || 500).json(handleError(err)));
    } else {
        res.status(400).json({message: 'Вы не можете просматривать чужие карты'});
    }
};

exports.delete = function (req, res) {
    cardsService.delete(req.params.cardId, req.user.id)
        .then(() => res.end('Deleted'))
        .catch(err => res.status(err.statusCode || 500).json(handleError(err)));
};