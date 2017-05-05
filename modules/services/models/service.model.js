"use strict";

module.exports = function (sequelize, DataTypes) {
    let Service = sequelize.define('Service', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    });

    return Service;
};