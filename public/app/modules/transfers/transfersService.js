app.service('transfersService', function ($http, $rootScope) {
    this.list = function (limit, offset) {
        return $http.get('api/users/' + $rootScope.app.userData.id + '/transfers/list?limit=' + limit + '&offset=' + offset);
    };

    this.create = function (newTransfer) {
        return $http.post('api/transfers', newTransfer);
    };
});