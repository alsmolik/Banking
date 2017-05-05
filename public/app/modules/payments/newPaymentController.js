app.controller('newPaymentController', function ($scope, $rootScope, paymentsService, cardsService, $uibModal) {
    paymentsService.getServices()
        .then(response => {
            $scope.services = response.data;
        })
        .catch(errResponse => $rootScope.app.handleError(errResponse.data));

    cardsService.getCards()
        .then(response => {
            $scope.cards = response.data;
        })
        .catch(errResponse => $rootScope.app.handleError(errResponse.data));

    $scope.openPaymentDialog = function (serviceCategory, serviceName) {
        let modalInstance = $uibModal.open({
            templateUrl: '/app/modules/payments/newPaymentModal.html',
            controller: 'newPaymentModalController',
            resolve: {
                serviceName: () => serviceCategory + ' / ' + serviceName,
                cards: () => $scope.cards
            }
        });

        modalInstance.result.then((cardId, amount) => {
            alert(amount);
        });
    };
});

app.controller('newPaymentModalController', function ($uibModalInstance, $scope, serviceName, cards) {
    $scope.serviceName = serviceName;
    $scope.cards = cards;

    $scope.getCardBalance = function (cardId) {
        if (!cardId) return 0;

        return $scope.cards.find(card => {
            return card.id == cardId;
        }).balance;
    };

    $scope.cancel = function () {
        $uibModalInstance.close();
    };
});