"use strict";

module.exports = function (servicesCategories, services) {
    this.getAll = function () {
        return servicesCategories.findAll({include: [{model: services}]});
    };
};