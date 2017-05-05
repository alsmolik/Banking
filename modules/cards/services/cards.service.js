"use strict";

module.exports = function (cards) {
    this.create = function (card) {
        return new Promise((resolve, reject) => {
            cards.build(card).save()
                .then(() => resolve())
                .catch(reject);
        });
    };

    this.getUserCards = function (userId) {
        return new Promise((resolve, reject) => {
            cards.findAll({where: {UserId: userId}})
                .then(resolve)
                .catch(reject);
        })
    };

    this.getUserCardsList = function (userId, limit, offset) {
        return new Promise((resolve, reject) => {
            cards.findAndCountAll({where: {UserId: userId}, limit: limit, offset: offset})
                .then(resolve)
                .catch(reject);
        })
    };

    this.delete = function (cardId, userId) {
        return new Promise((resolve, reject) => {
            cards.findOne({where: {id: cardId}})
                .then((card) => {
                    if (!card) throw {statusCode: 404, message: 'Карта не найдена'};
                    if (card.UserId != userId)  throw {statusCode: 400, message: 'Вы не можете удалить эту карту'};

                    return card.destroy();
                })
                .then(resolve)
                .catch(reject);
        });
    };
};