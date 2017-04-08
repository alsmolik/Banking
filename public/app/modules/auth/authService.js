app.service('authService', function ($http) {
    this.auth = function (user) {
        return $http.post('api/sessions', user);
    };
});