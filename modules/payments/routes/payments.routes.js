const paymentsController = require('../controllers/payments.controller');
const checkAuth = require('../../../middlewares/checkAuth');

module.exports = function (app) {
    app.route('/api/payments').all(checkAuth)
        .post(paymentsController.create);

    app.route('/api/users/:userId/payments/list').all(checkAuth)
        .get(paymentsController.getUserPaymentsList);
};