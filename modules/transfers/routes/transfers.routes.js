const transfersController = require('../controllers/transfers.controller');
const checkAuth = require('../../../middlewares/checkAuth');

module.exports = function (app) {
    app.route('/api/transfers').all(checkAuth)
        .post(transfersController.create);

    app.route('/api/users/:userId/transfers/list').all(checkAuth)
        .get(transfersController.getUserTransfersList);
};