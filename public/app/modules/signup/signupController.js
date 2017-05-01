app.controller('signupController', function ($scope, $rootScope, $location, toaster, signupService) {
    $rootScope.hideTopbar = true;
    $rootScope.hideSidebar = true;

    $scope.cancel = function () {
        $location.url('/auth');
    };

    $scope.signup = function () {
        let newUser = angular.copy($scope.user);
        newUser.password = newUser.password1;
        signupService.createUser(newUser)
            .then(() => {
                toaster.pop({type: 'success', body: 'Вы успешно зарегистрировались'});
                $location.url('/auth');
            })
            .catch(errResponse => {
                $rootScope.app.handleError(errResponse.data);
            });
    };
});