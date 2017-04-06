"use strict";

const db = require('../../../db');

exports.getAll = function (req, res) {
    let limit = +req.query.limit || 10;
    let offset = +req.query.offset || 0;

    db.User.findAndCountAll({attributes: {exclude: 'password'}, limit: limit, offset: offset})
        .then((users) => {
            res.json({
                metadata: {
                    count: users.count,
                    offset: offset,
                    limit: limit
                },
                users: users.rows
            });
        })
        .catch(() => {
            res.status(500).json({message: "Server error"});
        });
};