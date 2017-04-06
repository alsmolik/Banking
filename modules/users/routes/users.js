"use strict";

const usersController = require('../controllers/users');

module.exports = function(app){

    app.route('/api/users')
        .get(usersController.getAll);

};