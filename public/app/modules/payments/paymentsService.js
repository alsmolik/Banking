app.service('paymentsService', function ($http, $rootScope) {
    this.list = function (limit, offset) {
        return $http.get('api/users/' + $rootScope.app.userData.id + '/payments/list?limit=' + limit + '&offset=' + offset);
    };

    this.getServices = function () {
        return $http.get('api/services/categories');
    };

    this.pay = function (serviceId, cardId, amount) {
        return $http.post('api/payments', {serviceId: serviceId, cardId: cardId, amount: amount});
    };
});