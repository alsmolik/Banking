app.service('signupService', function ($http) {
    this.createUser = function (user) {
        return $http.post('api/users', user);
    };
});