"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
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
        password: DataTypes.CHAR(60)
    });

    return User;
};