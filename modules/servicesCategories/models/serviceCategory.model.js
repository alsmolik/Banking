"use strict";

module.exports = function (sequelize, DataTypes) {
    let ServiceCategory = sequelize.define('ServiceCategory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                ServiceCategory.hasMany(models.Service);
            }
        }
    });

    return ServiceCategory;
};