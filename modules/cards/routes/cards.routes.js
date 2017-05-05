"use strict";

const cardsController = require('../controllers/cards.controller');
const checkAuth = require('../../../middlewares/checkAuth');

module.exports = function (app) {
    app.route('/api/cards').all(checkAuth)
        .post(cardsController.create);

    app.route('/api/users/:userId/cards').all(checkAuth)
        .get(cardsController.getUserCards);

    app.route('/api/users/:userId/cards/list').all(checkAuth)
        .get(cardsController.getUserCardsList);

    app.route('/api/cards/:cardId').all(checkAuth)
        .delete(cardsController.delete);
};