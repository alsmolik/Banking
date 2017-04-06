app.controller('authController', function($scope, $rootScope, toaster) {
    $rootScope.hideTopbar = true;
    $rootScope.hideSidebar = true;

    $scope.login = function () {
        if (!$scope.username) return toaster.pop({type: 'error', body: 'Введите логин'});
        if (!$scope.password) return toaster.pop({type: 'error', body: 'Введите пароль'});

        
    };
});