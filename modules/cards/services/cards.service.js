"use strict";

module.exports = function (cards) {
    this.create = function (card) {
        card.number = card.number.replace(/\s/g, '');

        return cards.build(card).save();
    };

    this.getUserCards = function (userId) {
        return cards.findAll({where: {UserId: userId}});
    };

    this.getUserCardsList = function (userId, limit, offset) {
        return cards.findAndCountAll({where: {UserId: userId}, limit: limit, offset: offset});
    };

    this.delete = function (cardId, userId) {
        return cards.findOne({where: {id: cardId}})
            .then((card) => {
                if (!card) throw {statusCode: 404, message: 'Карта не найдена'};
                if (card.UserId != userId)  throw {statusCode: 400, message: 'Вы не можете удалить эту карту'};

                return card.destroy();
            });
    };
};