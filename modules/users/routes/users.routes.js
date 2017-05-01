"use strict";

const usersController = require('../controllers/users.controller');
const checkAuth = require('../../../middlewares/checkAuth');

module.exports = function (app) {
    app.route('/api/users')
        .get(usersController.getAll)
        .post(usersController.create);

    app.route('/api/user/data').all(checkAuth)
        .get(usersController.getUserData);
};