app.controller('paymentsController', function ($scope, $rootScope, NgTableParams, paymentsService) {
    $scope.tableParams = new NgTableParams({
        page: 1,
        count: 10
    }, {
        getData: function ($defer, params) {
            paymentsService.list(params.count(), (params.page() - 1) * params.count())
                .then(response => {
                    params.total(response.data.count);
                    $defer.resolve(response.data.rows);
                })
                .catch(errResponse => $rootScope.app.handleError(errResponse.data));
        }
    });
});