app.config(($stateProvider) => {
    $stateProvider
        .state({
            name: 'signup',
            url: '/signup',
            templateUrl: 'app/modules/signup/signupView.html',
            controller: 'signupController',
            authenticate: false
        })
        .state({
            name: 'auth',
            url: '/auth',
            templateUrl: 'app/modules/auth/authView.html',
            controller: 'authController',
            authenticate: false
        })
        .state({
            name: 'payments',
            url: '/payments',
            templateUrl: 'app/modules/payments/paymentsView.html',
            controller: 'paymentsController',
            authenticate: true
        })
        .state({
            name: 'newPayment',
            url: '/newPayment',
            templateUrl: 'app/modules/payments/newPaymentView.html',
            controller: 'newPaymentController',
            authenticate: true
        })
        .state({
            name: 'cards',
            url: '/cards',
            templateUrl: 'app/modules/cards/cardsView.html',
            controller: 'cardsController',
            authenticate: true
        })
        .state({
            name: 'addCard',
            url: '/addCard',
            templateUrl: 'app/modules/cards/addCardView.html',
            controller: 'addCardController',
            authenticate: true
        })
        .state({
            name: 'newTransfer',
            url: '/newTransfer',
            templateUrl: 'app/modules/transfers/newTransferView.html',
            controller: 'newTransferController',
            authenticate: true
        })
        .state({
            name: 'transfers',
            url: '/transfers',
            templateUrl: 'app/modules/transfers/transfersView.html',
            controller: 'transfersController',
            authenticate: true
        });
});

app.run(function ($rootScope, $state, $cookieStore) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.authenticate && $cookieStore.get('token') == undefined) {
            $state.transitionTo("auth");
            event.preventDefault();
        }
    });
});