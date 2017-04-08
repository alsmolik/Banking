app.directive('topbar', function ($location, $cookieStore) {
    return {
        restrict: 'E',
        templateUrl: 'app/shared/topbar/topbarView.html',
        link: function ($scope) {
            $scope.logout = function () {
                $cookieStore.remove('token');
                $location.url('/auth');
            }
        }
    };
});