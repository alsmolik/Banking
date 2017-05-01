app.controller('authController', function ($scope, $rootScope, toaster, authService, $cookieStore, $location) {
    $rootScope.hideTopbar = true;
    $rootScope.hideSidebar = true;
    $scope.user = {};

    (function init() {
        if ($cookieStore.get('token') != undefined) {
            $rootScope.hideTopbar = false;
            $rootScope.hideSidebar = false;
            $location.url('/payments');
        }
    })();

    $scope.login = function () {
        if (!$scope.user.username) return toaster.pop({type: 'error', body: 'Введите логин'});
        if (!$scope.user.password) return toaster.pop({type: 'error', body: 'Введите пароль'});

        authService.auth($scope.user)
            .then((response) => {
                $cookieStore.put("token", response.data.token);
                $rootScope.hideTopbar = false;
                $rootScope.hideSidebar = false;
                $rootScope.app.userData = response.data.userData;
                $location.url('/payments');
            })
            .catch(errResponse => {
                $rootScope.app.handleError(errResponse.data);
            });
    };

    $scope.signup = function () {
        $location.url('/signup');
    };
});