"use strict";

const sha256 = require('sha256');

module.exports = function (users) {
    this.getAll = function (limit, offset) {
        return new Promise((resolve, reject) => {
            users.findAndCountAll({attributes: {exclude: 'password'}, limit: limit, offset: offset})
                .then((users) => {
                    resolve({
                        metadata: {
                            count: users.count,
                            offset: offset,
                            limit: limit
                        },
                        users: users.rows
                    });
                })
                .catch(() => {
                    reject({statusCode: 500, message: 'Произошла ошибка при получении списка пользователей'});
                });
        });
    };

    this.create = function (newUser) {
        return new Promise((resolve, reject) => {
            users.find({where: {username: newUser.username}})
                .then(user => {
                    if (user) {
                        reject({statusCode: 409, message: 'Пользователь с таким логином уже существует'});
                    } else {
                        newUser.password = sha256(newUser.password);
                        resolve(users.build(newUser).save());
                    }
                });
        });
    };
};