"use strict";

const sessionsController = require('../controllers/sessions.controller.js');

module.exports = function (app) {

    app.route('/api/sessions')
        .post(sessionsController.create);

};