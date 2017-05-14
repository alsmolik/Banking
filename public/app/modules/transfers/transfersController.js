app.controller('transfersController', function ($scope, $rootScope, NgTableParams, transfersService) {
    $scope.tableParams = new NgTableParams({
        page: 1,
        count: 10
    }, {
        getData: function ($defer, params) {
            transfersService.list(params.count(), (params.page() - 1) * params.count())
                .then(response => {
                    params.total(response.data.count);
                    $defer.resolve(response.data.rows);
                })
                .catch(errResponse => $rootScope.app.handleError(errResponse.data));
        }
    });
    
    $scope.getType = function (fromUser, toUser) {
        if (fromUser == toUser) return '<span class="glyphicon glyphicon-resize-horizontal text-warning"></span>';
        else if (toUser == $rootScope.app.userData.id) return '<span class="glyphicon glyphicon-arrow-up text-success"></span>';
        else return '<span class="glyphicon glyphicon-arrow-down text-danger"></span>';
    };
});