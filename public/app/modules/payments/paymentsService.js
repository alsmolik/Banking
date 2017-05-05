app.service('paymentsService', function ($http) {
    this.getServices = function () {
        return $http.get('api/services/categories');
    };
});