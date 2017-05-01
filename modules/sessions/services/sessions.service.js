"use strict";

const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const config = require('../../../config.json');

module.exports = function (users) {
    this.create = function (username, password) {
        return new Promise((resolve, reject) => {
            users.find({where: {username: username}})
                .then(user => {
                    if (user) {
                        if (user.password == sha256(password)) {
                            resolve({
                                token: jwt.sign({id: user.id, username: user.username}, config.secret_key),
                                userData: {id: user.id, username: user.username}
                            });
                        } else {
                            reject({statusCode: 400, message: 'Неверный пароль'});
                        }
                    } else {
                        reject({statusCode: 400, message: 'Пользователя с таким логином не существует'});
                    }
                })
                .catch(err => {
                    reject({statusCode: 500, message: err.message});
                });
        });
    };
};