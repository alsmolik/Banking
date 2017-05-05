"use strict";

module.exports = function (servicesCategories, services) {
    this.getAll = function () {
        return new Promise((resolve, reject) => {
            servicesCategories.findAll({include: [{model: services}]})
                .then((result) => resolve(result))
                .catch(reject);
        });
    };
};