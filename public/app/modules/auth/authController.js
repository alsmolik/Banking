app.controller('authController', function ($scope, $rootScope, toaster, authService, $cookieStore, $location) {
    $rootScope.hideTopbar = true;
    $rootScope.hideSidebar = true;
    $scope.user = {};

    $scope.login = function () {
        if (!$scope.user.username) return toaster.pop({type: 'error', body: 'Введите логин'});
        if (!$scope.user.password) return toaster.pop({type: 'error', body: 'Введите пароль'});

        authService.auth($scope.user)
            .then((response) => {
                $cookieStore.put("token", response.data.token);
                $rootScope.hideTopbar = false;
                $rootScope.hideSidebar = false;
                $location.url('/payments');
            })
            .catch((errResponse) => {
                toaster.pop({type: 'error', body: errResponse.data.message});
            });
    };
});