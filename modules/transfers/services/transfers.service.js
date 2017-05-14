module.exports = function (sequelize, cards, transfers) {
    this.create = function (userId, cardId, destinationCardNumber, amount, notes) {
        return sequelize.transaction(function (t) {
            return Promise.all([cards.findOne({where: {number: destinationCardNumber}}), cards.findOne({where: {id: cardId}})])
                .then(([destinationCard, card]) => {
                    if (!destinationCard) throw {statusCode: 404, message: 'Карта получателя не найдена'};
                    if (!card) throw {statusCode: 404, message: 'Карта не найдена'};
                    if (card.UserId != userId) throw {statusCode: 400, message: 'Нельзя делать перевод с чужой карты'};
                    if (card.balance < amount) throw {statusCode: 400, message: 'На карте недостаточно средств'};
                    if (amount <= 0) throw {statusCode: 400, message: 'Неверная сумма перевода'};
                    card.balance -= amount;
                    destinationCard.balance += amount;

                    return Promise.all([transfers.build({
                        amount: amount,
                        notes: notes,
                        fromUser: userId,
                        toUser: destinationCard.UserId,
                        fromCard: card.id,
                        toCard: destinationCard.id
                    }).save({transaction: t}), card.save({transaction: t}), destinationCard.save({transaction: t})]);
                });
        });
    };

    this.getUserTransfersList = function (userId, limit, offset) {
        return transfers.findAndCountAll({
            where: {$or: [{fromUser: userId}, {toUser: userId}]},
            include: [{model: cards, as: 'from_card'}, {model: cards, as: 'to_card'}],
            limit: limit,
            offset: offset,
            order: 'id DESC'
        });
    };
};