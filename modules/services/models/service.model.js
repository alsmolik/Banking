"use strict";

module.exports = function (sequelize, DataTypes) {
    let Service = sequelize.define('Service', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Service.belongsTo(models.ServiceCategory);
            }
        }
    });

    return Service;
};