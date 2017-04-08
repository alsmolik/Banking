app.config(($stateProvider) => {
    $stateProvider
        .state({
            name: 'payments',
            url: '/payments',
            templateUrl: 'app/modules/payments/paymentsView.html'
        })
        .state({
            name: 'auth',
            url: '/auth',
            templateUrl: 'app/modules/auth/authView.html',
            controller: 'authController'
        });
});

app.run(function ($rootScope, $state, $cookieStore, $location) {
    $rootScope.$on('$locationChangeSuccess', function () {
        if ($cookieStore.get("token") == undefined) {
            $location.url('/auth');
        }
    });
});