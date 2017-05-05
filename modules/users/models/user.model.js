"use strict";

module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: DataTypes.CHAR(64),
        surname: DataTypes.STRING,
        name: DataTypes.STRING,
        patronymic: DataTypes.STRING,
        identification_number: DataTypes.STRING
    }, {
        classMethods: {
            associate: (models) => {
                User.hasMany(models.Card);
            }
        }
    });

    return User;
};