app.controller('newPaymentController', function ($scope, $rootScope, paymentsService, cardsService, $uibModal, toaster) {
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

    $scope.openPaymentDialog = function (serviceId, serviceCategory, serviceName) {
        let modalInstance = $uibModal.open({
            templateUrl: '/app/modules/payments/newPaymentModal.html',
            controller: 'newPaymentModalController',
            resolve: {
                serviceName: () => serviceCategory + ' / ' + serviceName,
                cards: () => $scope.cards
            }
        });

        modalInstance.result.then((result) => {
            paymentsService.pay(serviceId, result.cardId, result.amount)
                .then(() => toaster.pop('success', 'Платеж успешно выполнен'))
                .catch(errResponse => $rootScope.app.handleError(errResponse.data));
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

    $scope.pay = function () {
        $uibModalInstance.close({cardId: $scope.cardId, amount: $scope.amount});
    };
});