"use strict";

const db = require('../../../db');
const servicesCategoriesService = new (require('../services/servicesCategories.service'))(db.ServiceCategory, db.Service);
const handleError = require('../../../helpers/handleError');

exports.getAll = function (req, res) {
    servicesCategoriesService.getAll()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(err.statusCode || 500).json({message: err.message});
        });
};