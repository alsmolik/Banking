'use strict';

module.exports = function (sequelize, DataTypes) {
    let Payment = sequelize.define('Payment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: DataTypes.DECIMAL(10, 2)
    }, {
        classMethods: {
            associate: function (models) {
                Payment.belongsTo(models.User);
                Payment.belongsTo(models.Service);
                Payment.belongsTo(models.Card);
            }
        }
    });

    return Payment;
};