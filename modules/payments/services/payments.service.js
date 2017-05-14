"use strict";

module.exports = function (sequelize, cards, services, servicesCategories, payments) {
    this.create = function (userId, serviceId, cardId, amount) {
        return sequelize.transaction(function (t) {
            return cards.findOne({where: {id: cardId}})
                .then(card => {
                    if (!card) throw {statusCode: 404, message: 'Карта не найдена'};
                    if (card.UserId != userId) throw {statusCode: 400, message: 'Нельзя платить с чужой карты'};
                    if (amount <= 0) throw {statusCode: 400, message: 'Неверная сумма платежа'};
                    if (card.balance < amount) throw {statusCode: 400, message: 'На карте недостаточно средств'};
                    card.balance -= amount;

                    return Promise.all([payments.build({
                        amount: amount,
                        UserId: userId,
                        ServiceId: serviceId,
                        CardId: cardId
                    }).save({transaction: t}), card.save({transaction: t})]);
                });
        });
    };

    this.getUserPaymentsList = function (userId, limit, offset) {
        return payments.findAndCountAll({
            where: {UserId: userId},
            include: [{model: cards}, {model: services, include: [{model: servicesCategories}]}],
            limit: limit,
            offset: offset,
            order: 'id DESC'
        });
    };
};