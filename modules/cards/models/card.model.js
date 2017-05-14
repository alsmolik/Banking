"use strict";

module.exports = function (sequelize, DataTypes) {
    let Card = sequelize.define("Card", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        number: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                is: {
                    args: /^\d{16}$/,
                    msg: 'Номер карты должен содержать только цифры'
                }
            }
        },
        cvc: {
            type: DataTypes.INTEGER,
            validate: {
                is: {
                    args: /^\d{3}$/,
                    msg: 'CVC код должен состоять из трех цифр'
                }
            }
        },
        expires: {
            type: DataTypes.STRING,
            validate: {
                is: {
                    args: /^((0[1-9])|(1[0-2])) \/ ([1-9][0-9])$/,
                    msg: 'Неверный срок действия карты'
                }
            }
        },
        name: {
            type: DataTypes.STRING
        },
        balance: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        }
    });

    return Card;
};