"use strict";

module.exports = function (sequelize, DataTypes) {
    let Transfer = sequelize.define('Transfer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: DataTypes.DECIMAL(10, 2),
        notes: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Transfer.belongsTo(models.User, {foreignKey: 'fromUser'});
                Transfer.belongsTo(models.User, {foreignKey: 'toUser'});
                Transfer.belongsTo(models.Card, {as: 'from_card', foreignKey: 'fromCard'});
                Transfer.belongsTo(models.Card, {as: 'to_card', foreignKey: 'toCard'});
            }
        }
    });

    return Transfer;
};