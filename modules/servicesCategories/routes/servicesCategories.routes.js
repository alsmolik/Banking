"use strict";

const servicesCategoriesController = require('../controllers/servicesCategories.controller');
const checkAuth = require('../../../middlewares/checkAuth');

module.exports = function (app) {
    app.route('/api/services/categories').all(checkAuth)
        .get(servicesCategoriesController.getAll);
};