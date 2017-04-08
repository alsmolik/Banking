"use strict";

const usersController = require('../controllers/users.controller');

module.exports = function(app){

    app.route('/api/users')
        .get(usersController.getAll)
        .post(usersController.create);

};